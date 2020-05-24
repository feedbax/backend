import { NohmModel } from 'nohm';
import flake from '~lib/flake-uuid';

import * as getter from './getter';
import * as actions from './actions';

import definitions from './definitions';

import type { LikeModel } from '~models/Like';
import type { AnswerProperties, AnswerArchivable } from '@shared/models/answer';
import type { Definitions } from './types';

// eslint-disable-next-line import/prefer-default-export
export class AnswerModel extends NohmModel<AnswerProperties> {
  public static modelName = 'Answer';
  public static idGenerator = flake;

  protected static definitions: Definitions = definitions;

  public static get = actions.get;

  public get archivable(): Promise<AnswerArchivable> {
    return getter.archivable.bind(this)();
  }

  public get linkedLikes(): Promise<LikeModel[]> {
    return getter.linkedLikes.bind(this)();
  }
}
