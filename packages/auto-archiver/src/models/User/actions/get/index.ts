import bcrypt from 'bcryptjs';
import { error } from '~lib/logger';
import { UserError } from '~types/errors';
import statics from '~models/statics';

import type { UserModel } from '~models/User';

import type { ByEmail, ByEmailAndPassword, ById } from './types';
import type { ValidatePassword } from './types';
import type { Get, Props } from './types';

const byId: ById = (
  async (id) => {
    try {
      const { UserModelStatic } = statics.models;
      const User = await UserModelStatic.load<UserModel>(id);

      if (typeof User === 'undefined') {
        throw new UserError('email-not-found');
      }

      return User;
    } catch (err) {
      error('User', 'get', 'byEmail', err);
      throw new UserError('get-by-email');
    }
  }
);

const byEmail: ByEmail = (
  async (email) => {
    try {
      const { UserModelStatic } = statics.models;
      const Users = await UserModelStatic.findAndLoad<UserModel>({ email });

      const [User] = Users;

      if (typeof User === 'undefined') {
        throw new UserError('email-not-found');
      }

      return User;
    } catch (err) {
      error('User', 'get', 'byEmail', err);
      throw new UserError('get-by-email');
    }
  }
);

const validatePassword: ValidatePassword = (
  async (user, password) => {
    const { password: hashedPassword } = user.allProperties();
    const validPassword = await bcrypt.compare(password, hashedPassword);

    if (!validPassword) {
      throw new UserError('password-incorrect');
    }
  }
);

const byEmailAndPassword: ByEmailAndPassword = (
  async (email, password) => {
    try {
      const User = await byEmail(email);
      await validatePassword(User, password);

      return User;
    } catch (err) {
      error('User', 'get', 'byEmailAndPassword', err);
      throw new UserError('get-by-email-and-password');
    }
  }
);

export const get: Get = (
  async (props: Partial<Props>): Promise<any> => {
    const { id, email, password } = props;

    if (id) {
      return byId(id);
    }

    if (email && password) {
      return byEmailAndPassword(email, password);
    }

    if (email) {
      return byEmail(email);
    }

    error('User', 'get', 'noArgument');
    throw new UserError('get-no-argument');
  }
);

export type get = Get;
