import { NohmModel } from 'nohm';

import flake from '~lib/flake-uuid';

import * as actions from './actions';
import * as getter from './getter';

import definitions from './definitions';

import type { LikeProperties, LikeArchivable } from '@shared/models/like';

import type { AnswerModel } from '~models/Answer';
import type { EventModel } from '~models/Event';

import type { Definitions } from './types';

// eslint-disable-next-line import/prefer-default-export
export class LikeModel extends NohmModel<LikeProperties> {
  public static modelName = 'Like';
  public static idGenerator = flake;

  public static get = actions.get;
  public static toggle = actions.toggle;
  public static create = actions.create;

  protected static definitions: Definitions = definitions;

  public get archivable(): LikeArchivable {
    return getter.archivable.bind(this)();
  }

  public get parent(): Promise<AnswerModel> {
    return getter.parent.bind(this)();
  }

  public get parentEvent(): Promise<EventModel> {
    return getter.parentEvent.bind(this)();
  }
}
