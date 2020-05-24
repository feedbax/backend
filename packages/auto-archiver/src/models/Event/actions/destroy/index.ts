import { error } from '~lib/logger';
import { EventError } from '~types/errors';

import statics from '~models/statics';

import type { ById, ByModel } from './types';
import type { Destroy, Props } from './types';

const flatten = <T>(acc: T[], val: T[]): T[] => acc.concat(val);

const byModel: ByModel = (
  async (Event) => {
    try {
      // const { EventModelStatic } = statics.models;

      // const Event = await EventModelStatic.get({ id: props.id });
      const Questions = await Event.linkedQuestions;

      const AnswersPromise = Questions.map((q) => q.linkedAnswers);
      const AnswersNested = await Promise.all(AnswersPromise);
      const Answers = AnswersNested.reduce(flatten, []);

      const LikesPromise = Answers.map((q) => q.linkedLikes);
      const LikesNested = await Promise.all(LikesPromise);
      const Likes = LikesNested.reduce(flatten, []);

      const allModels = [Event, ...Questions, ...Answers, ...Likes];
      const removePromise: Promise<void>[] = [];

      for (let i = 0; i < allModels.length; i += 1) {
        const model = allModels[i];
        const promise = model.remove();

        removePromise.push(promise);
      }

      await Promise.all(removePromise);
    } catch (err) {
      error('Event', 'destroy', 'withUser', err);
      throw new EventError('destroy-with-user');
    }
  }
);

const byId: ById = (
  async (id) => {
    try {
      const { EventModelStatic } = statics.models;
      const Event = await EventModelStatic.get({ id });

      return byModel(Event);
    } catch (err) {
      error('Event', 'destroy', 'withUser', err);
      throw new EventError('destroy-with-user');
    }
  }
);

export const destroy: Destroy = (
  async (props: Partial<Props>): Promise<any> => {
    const { event, eventId } = props;

    if (typeof event !== 'undefined') {
      return byModel(event);
    }

    if (typeof eventId !== 'undefined') {
      return byId(eventId);
    }

    error('Event', 'destroy', 'noArgument');
    throw new EventError('destroy-no-argument');
  }
);

export type destroy = Destroy;
