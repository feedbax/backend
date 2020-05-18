import { NohmModel } from 'nohm';

import flake from '~lib/flake-uuid';
import statics from '~models/statics';

import * as actions from './actions';
import * as getter from './getter';

import definitions from './definitions';

import type { UserProperties, UserResolved } from '@shared/models/user';

import type { EventModel } from '~models/Event';

import type { Definitions } from './types';
import type { AdminFor, CreateEvent } from './types';

// eslint-disable-next-line import/prefer-default-export
export class UserModel extends NohmModel<UserProperties> {
  public static modelName = 'User';
  public static idGenerator = flake;

  public static get = actions.get;
  public static create = actions.create;
  public static isAdminFor = actions.adminFor;

  protected static definitions: Definitions = definitions;

  public get resolved(): Promise<UserResolved> {
    return getter.resolved.bind(this)();
  }

  public get linkedEvents(): Promise<EventModel[]> {
    return getter.linkedEvents.bind(this)();
  }

  /**
   * Checks if the user is the admin of the given model(s).
   */
  public isAdminFor: AdminFor = (
    (props: any) => UserModel.isAdminFor(this, props)
  );

  public createEvent: CreateEvent = (
    async (props) => {
      const { EventModelStatic } = statics.models;
      return EventModelStatic.create(props, { user: this });
    }
  );
}
