import { QuestionError } from '~types/errors';
import { error } from '~lib/logger';

import type { GetterResolved } from './types';
import { QuestionKeys } from '@shared/models/question';

export const resolved: GetterResolved = (
  async function () {
    try {
      const Answers = await this.linkedAnswers;

      const answersPromise = Answers.map((Answer) => Answer.resolved);
      const answers = await Promise.all(answersPromise);
      const props = this.allProperties();

      return {
        [QuestionKeys.id]: props.id,
        [QuestionKeys.order]: props.order,
        [QuestionKeys.text]: props.text,
        [QuestionKeys.type]: props.type,
        [QuestionKeys.settings]: props.settings,
        [QuestionKeys.answers]: answers,
      };
    } catch (err) {
      error('QuestionModel', 'resolved', err);
      throw new QuestionError('resolved');
    }
  }
);

export type resolved = GetterResolved;
