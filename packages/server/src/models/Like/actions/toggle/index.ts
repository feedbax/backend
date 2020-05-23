import { ToggleActions } from '@shared/models/like';

import statics from '~models/statics';
import { error } from '~lib/logger';
import { LikeError } from '~types/errors';

import type { AnswerModel } from '~models/Answer';

import { GetContext, Context } from './types';
import { ByAnswer, ByAnswerId } from './types';
import { Toggle, Props } from './types';
import { ContextKeys } from '@shared/packets/context';

const getContext: GetContext = (
  async (Like) => {
    const Answer = await Like.parent;
    const Question = await Answer.parent;

    const questionId = Question.id;
    const answerId = Answer.id;

    if (questionId === null) {
      throw new LikeError('question-id-null');
    }

    if (answerId === null) {
      throw new LikeError('answer-id-null');
    }

    return {
      [ContextKeys.questionId]: questionId,
      [ContextKeys.answerId]: answerId,
    };
  }
);

const byAnswer: ByAnswer = (
  async (answer, author) => {
    try {
      const { LikeModelStatic } = statics.models;
      const [isLiked, Like] = await answer.isLikedBy(author);

      let action: ToggleActions;
      let context: Context;

      if (isLiked && Like) {
        action = ToggleActions.Destroyed;
        context = await getContext(Like);

        await Like.remove();
      } else {
        const LikeAdded = await LikeModelStatic.create({ author }, { answer });

        action = ToggleActions.Created;
        context = await getContext(LikeAdded);
      }

      return [action, context];
    } catch (err) {
      error('Like', 'toggle', 'byAnswer', err);
      throw new LikeError('toggle-by-answer');
    }
  }
);

const byAnswerId: ByAnswerId = (
  async (answerId, author) => {
    try {
      const { AnswerModelStatic } = statics.models;
      const answer = await AnswerModelStatic.load<AnswerModel>(answerId);

      return byAnswer(answer, author);
    } catch (err) {
      error('Like', 'toggle', 'byAnswerId', err);
      throw new LikeError('toggle-by-answer-id');
    }
  }
);

export const toggle: Toggle = (
  (author: string, props: Partial<Props>): Promise<any> => {
    const { answer, answerId } = props;

    if (typeof answer !== 'undefined') {
      return byAnswer(answer, author);
    }

    if (typeof answerId !== 'undefined') {
      return byAnswerId(answerId, author);
    }

    error('Like', 'toggle', 'noArgument');
    throw new LikeError('toggle-no-argument');
  }
);

export type toggle = Toggle;
