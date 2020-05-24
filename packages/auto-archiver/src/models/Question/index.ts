import { NohmModel } from 'nohm';
import flake from '~lib/flake-uuid';

import * as getter from './getter';
import * as actions from './actions';

import definitions from './definitions';

import type { QuestionProperties, QuestionArchivable } from '@shared/models/question';
import type { AnswerModel } from '~models/Answer';
import type { Definitions } from './types';

// eslint-disable-next-line import/prefer-default-export
export class QuestionModel extends NohmModel<QuestionProperties> {
  public static modelName = 'Question';
  public static idGenerator = flake;

  protected static definitions: Definitions = definitions;

  public static get = actions.get;

  public get archivable(): Promise<QuestionArchivable> {
    return getter.archivable.bind(this)();
  }

  public get linkedAnswers(): Promise<AnswerModel[]> {
    return getter.linkedAnswers.bind(this)();
  }
}
