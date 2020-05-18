import { NohmModel } from 'nohm';

import flake from '~lib/flake-uuid';
import statics from '~models/statics';

import * as actions from './actions';
import * as getter from './getter';

import definitions from './definitions';

import type { QuestionProperties, QuestionResolved } from '@shared/models/question';

import type { EventModel } from '~models/Event';
import type { AnswerModel } from '~models/Answer';

import type { Definitions, CreateAnswer } from './types';

// eslint-disable-next-line import/prefer-default-export
export class QuestionModel extends NohmModel<QuestionProperties> {
  public static modelName = 'Question';
  public static idGenerator = flake;

  public static create = actions.create;
  public static destroy = actions.destroy;
  public static get = actions.get;

  protected static definitions: Definitions = definitions;

  public get parent(): Promise<EventModel> {
    return getter.parent.bind(this)();
  }

  public get parentEvent(): Promise<EventModel> {
    return getter.parentEvent.bind(this)();
  }

  public get resolved(): Promise<QuestionResolved> {
    return getter.resolved.bind(this)();
  }

  public get linkedAnswers(): Promise<AnswerModel[]> {
    return getter.linkedAnswers.bind(this)();
  }

  public createAnswer: CreateAnswer = (
    async (props, isAdmin = false) => {
      const { AnswerModelStatic } = statics.models;
      return AnswerModelStatic.create(props, { question: this }, isAdmin);
    }
  );
}
