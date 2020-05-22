import { error } from '~lib/logger';
import statics from '~models/statics';
import { AnswerError } from '~types/errors';
import { ContextKeys } from '@shared/packets/context';

import type { WithAnswer, WithAnswerId } from './types';
import type { Destroy, Props } from './types';

const withAnswer: WithAnswer = (
  async (answer) => {
    try {
      const question = await answer.parent;
      const questionId = question.id;
      const destroyedAnswerId = answer.id;

      if (questionId === null) {
        throw new AnswerError('question-id-null');
      }

      if (destroyedAnswerId === null) {
        throw new AnswerError('answer-id-null');
      }

      const context = {
        [ContextKeys.questionId]: questionId,
      };

      const destroyedLikes = await answer.linkedLikes;
      const likesRemovePromises = [];

      for (let i = 0; i < destroyedLikes.length; i += 1) {
        const like = destroyedLikes[i];
        const likeRemovePromise = like.remove();

        likesRemovePromises.push(likeRemovePromise);
      }

      await Promise.all(likesRemovePromises);
      await answer.remove();

      const questionLikes = (await question.linkedLikes).length;

      return {
        context,
        questionLikes,
        destroyedAnswerId,
      };
    } catch (err) {
      error('Answer', 'destroy', 'withAnswer', err);
      throw new AnswerError('destroy-with-answer');
    }
  }
);

const withAnswerId: WithAnswerId = (
  async (answerId) => {
    try {
      const { AnswerModelStatic } = statics.models;
      const Answer = await AnswerModelStatic.get({ id: answerId });

      return withAnswer(Answer);
    } catch (err) {
      error('Answer', 'destroy', 'withAnswerId', err);
      throw new AnswerError('destroy-with-answer-id');
    }
  }
);

export const destroy: Destroy = (
  async (props: Partial<Props>) => {
    const { answer, answerId } = props;

    if (typeof answer !== 'undefined') {
      return withAnswer(answer);
    }

    if (typeof answerId !== 'undefined') {
      return withAnswerId(answerId);
    }

    error('Answer', 'destroy', 'noArgument');
    throw new AnswerError('destroy-no-argument');
  }
);

export type destroy = Destroy;
