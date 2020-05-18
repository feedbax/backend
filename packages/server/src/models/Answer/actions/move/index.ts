import { error } from '~lib/logger';
import { AnswerError } from '~types/errors';

import type { Move } from './types';

export const move: Move = (
  async (answer, question) => {
    try {
      const parent = await answer.parent;

      answer.unlink(parent);
      parent.unlink(answer);

      answer.link(question);
      question.link(answer);

      await parent.save();
      await question.save();
    } catch (err) {
      error('Answer', 'move', err);
      throw new AnswerError('move');
    }
  }
);

export type move = Move;
