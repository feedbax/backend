import { Nohm } from 'nohm';
import { error } from '~lib/logger';
import { LikeError } from '~types/errors';

import type { LikeModel } from '~models/Like';

import type { WithAnswer } from './types';
import type { Create, Props } from './types';

const withAnswer: WithAnswer = (
  async (input) => {
    try {
      const { answer, props } = input;

      const Like = await Nohm.factory<LikeModel>('Like');
      const Question = await answer.parent;
      const Event = await answer.parentEvent;

      Like.property(props);
      Like.link(answer);
      Like.link(Event);

      Question.link(Like);
      answer.link(Like);

      const promises = [
        Event.save(),
        Question.save(),
        answer.save(),
        Like.save(),
      ];

      await Promise.all(promises);

      return Like;
    } catch (err) {
      error('Like', 'create', 'withAnswer', err);
      throw new LikeError('create-with-answer');
    }
  }
);

export const create: Create = (
  async (props, data: Partial<Props>): Promise<any> => {
    const { answer } = data;

    if (typeof answer !== 'undefined') {
      return withAnswer({ answer, props });
    }

    error('Like', 'create', 'noArgument');
    throw new LikeError('create-no-argument');
  }
);

export type create = Create;
