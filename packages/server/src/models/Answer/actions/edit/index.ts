import { error } from '~lib/logger';
import statics from '~models/statics';
import { AnswerError } from '~types/errors';

import type { WithAnswer, WithAnswerId } from './types';
import type { Edit, Props } from './types';

const withAnswer: WithAnswer = (
  async (answer, text) => {
    try {
      answer.property('text', text);
      await answer.save();

      return answer;
    } catch (err) {
      error('Answer', 'edit', 'withAnswer', err);
      throw new AnswerError('edit-with-answer');
    }
  }
);

const withAnswerId: WithAnswerId = (
  async (answerId, text) => {
    try {
      const { AnswerModelStatic } = statics.models;
      const Answer = await AnswerModelStatic.get({ id: answerId });

      return withAnswer(Answer, text);
    } catch (err) {
      error('Answer', 'edit', 'withAnswerId', err);
      throw new AnswerError('edit-with-answer-id');
    }
  }
);

export const edit: Edit = (
  async (props: Partial<Props>) => {
    const { text } = props;
    const { answer, answerId } = props;

    if (typeof text === 'undefined') {
      error('Answer', 'edit', 'noText');
      throw new AnswerError('edit-no-text');
    }

    if (typeof answer !== 'undefined') {
      return withAnswer(answer, text);
    }

    if (typeof answerId !== 'undefined') {
      return withAnswerId(answerId, text);
    }

    error('Answer', 'edit', 'noArgument');
    throw new AnswerError('edit-no-argument');
  }
);

export type edit = Edit;
