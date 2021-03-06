import { NohmModel } from 'nohm';

import flake from '~lib/flake-uuid';
import statics from '~models/statics';

import * as actions from './actions';
import * as getter from './getter';

import definitions from './definitions';

import type { QuestionModel } from '~models/Question';
import type { EventModel } from '~models/Event';
import type { LikeModel } from '~models/Like';

import type { AnswerProperties, AnswerResolvedFlat, AnswerArchivable } from '@shared/models/answer';

import type { Definitions, Resolved } from './types';
import type { Move, IsLikedBy } from './types';
import type { CreateLike } from './types';

// eslint-disable-next-line import/prefer-default-export
export class AnswerModel extends NohmModel<AnswerProperties> {
  public static modelName = 'Answer';
  public static idGenerator = flake;

  public static get = actions.get;
  public static isLikedBy = actions.isLikedBy;
  public static move = actions.move;
  public static create = actions.create;
  public static destroy = actions.destroy;
  public static edit = actions.edit;
  public static merge = actions.merge;
  public static resolved = actions.resolved;

  protected static definitions: Definitions = definitions;

  public get archivable(): Promise<AnswerArchivable> {
    return getter.archivable.bind(this)();
  }

  public get parent(): Promise<QuestionModel> {
    return getter.parent.bind(this)();
  }

  public get parentEvent(): Promise<EventModel> {
    return getter.parentEvent.bind(this)();
  }

  public get linkedLikes(): Promise<LikeModel[]> {
    return getter.linkedLikes.bind(this)();
  }

  public get linkedLikesCount(): Promise<number> {
    return getter.linkedLikesCount.bind(this)();
  }

  public get resolvedFlat(): AnswerResolvedFlat {
    return getter.resolvedFlat.bind(this)();
  }

  public resolved: Resolved = (
    (userUUID) => AnswerModel.resolved(this, userUUID)
  );

  public isLikedBy: IsLikedBy = (
    (author) => AnswerModel.isLikedBy(this, author)
  );

  public move: Move = (
    (question) => AnswerModel.move(this, question)
  );

  public createLike: CreateLike = (
    (props) => {
      const { LikeModelStatic } = statics.models;
      return LikeModelStatic.create(props, { answer: this });
    }
  );
}
