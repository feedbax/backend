import { QuestionError } from '~types/errors';
import { error } from '~lib/logger';

import type { GetterResolved } from './types';
import { QuestionKeys } from '@shared/models/question';

export const resolved: GetterResolved = (
  async function (question, userUUID) {
    try {
      const props = question.allProperties();

      const Answers = await question.linkedAnswers;
      const answersPromise = Answers.map((Answer) => Answer.resolved(userUUID));
      const answers = await Promise.all(answersPromise);

      const likes = await question.linkedLikesCount;

      return {
        [QuestionKeys.id]: props.id,
        [QuestionKeys.order]: props.order,
        [QuestionKeys.text]: props.text,
        [QuestionKeys.type]: props.type,
        [QuestionKeys.settings]: props.settings,
        [QuestionKeys.answers]: answers,
        [QuestionKeys.likes]: likes,
        [QuestionKeys.hasLiked]: true,
      };
    } catch (err) {
      error('QuestionModel', 'resolved', err);
      throw new QuestionError('resolved');
    }
  }
);

export type resolved = GetterResolved;
