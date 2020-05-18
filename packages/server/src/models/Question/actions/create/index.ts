import { Nohm } from 'nohm';

import { error } from '~lib/logger';
import { QuestionError } from '~types/errors';

import { getDefaultSettings } from '@shared/models/question';
import type { QuestionModel } from '~models/Question';

import type { Create, WithEvent } from './types';
import type { Props } from './types';

const withEvent: WithEvent = (
  async (event, props) => {
    try {
      const Question = await Nohm.factory<QuestionModel>('Question');

      Question.property({
        ...props,
        settings: getDefaultSettings(props),
      });

      Question.link(event);
      event.link(Question);

      await event.save();

      return Question;
    } catch (err) {
      error('Question', 'create', 'withEvent', err);
      throw new QuestionError('create-with-event');
    }
  }
);

export const create: Create = (
  async (props, data: Partial<Props>): Promise<any> => {
    const { event } = data;

    if (typeof event !== 'undefined') {
      return withEvent(event, props);
    }

    error('Question', 'create', 'noArgument');
    throw new QuestionError('create-no-argument');
  }
);

export type create = Create;
