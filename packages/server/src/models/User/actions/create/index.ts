import { Nohm } from 'nohm';

import { error } from '~lib/logger';
import { UserError } from '~types/errors';

import type { UserModel } from '~models/User';
import type { Create } from './types';

export const create: Create = (
  async (props): Promise<any> => {
    try {
      const user = await Nohm.factory<UserModel>('User');

      user.property(props);
      await user.save();

      return user;
    } catch (err) {
      error('User', 'create', err);
      throw new UserError('create');
    }
  }
);

export type create = Create;
