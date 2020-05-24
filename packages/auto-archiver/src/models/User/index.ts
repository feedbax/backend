import { NohmModel } from 'nohm';
import flake from '~lib/flake-uuid';

import definitions from './definitions';
import * as actions from './actions';

import type { UserProperties } from '@shared/models/user';
import type { Definitions } from './types';

// eslint-disable-next-line import/prefer-default-export
export class UserModel extends NohmModel<UserProperties> {
  public static modelName = 'User';
  public static idGenerator = flake;

  protected static definitions: Definitions = definitions;

  public static get = actions.get;
}
