import { NohmModel } from 'nohm';
import flake from '~lib/flake-uuid';

import definitions from './definitions';

import * as actions from './actions';
import * as getter from './getter';

import type { EventProperties, EventArchivable } from '@shared/models/event';
import type { QuestionModel } from '~models/Question';
import type { UserModel } from '~models/User';
import type { Definitions } from './types';

// eslint-disable-next-line import/prefer-default-export
export class EventModel extends NohmModel<EventProperties> {
  public static modelName = 'Event';
  public static idGenerator = flake;

  protected static definitions: Definitions = definitions;

  public static get = actions.get;
  public static destroy = actions.destroy;

  public get parent(): Promise<UserModel> {
    return getter.parent.bind(this)();
  }

  public get archivable(): Promise<EventArchivable> {
    return getter.archivable.bind(this)();
  }

  public get linkedQuestions(): Promise<QuestionModel[]> {
    return getter.linkedQuestions.bind(this)();
  }
}
