import { error } from '~lib/logger';
import statics from '~models/statics';
import { isEventModel } from '~models/Event/types';
import { UserError } from '~types/errors';

import type { UserModel } from '~models/User';
import type { EventModel } from '~models/Event';

import type { BaseModelStatic } from '~models/register';

import type { ByModel, ById, AdminFor } from './types';
import type { Props, Models } from './types';

const byModel: ByModel = (
  async (user, model) => {
    try {
      let $EventModel: EventModel;

      if (isEventModel(model)) {
        $EventModel = model;
      } else {
        $EventModel = await model.parentEvent;
      }

      const EventsUser = await user.linkedEvents;
      const eventsUserIds = EventsUser.map((Event) => Event.id);
      const eventId = $EventModel.id;

      const eventIds = [eventId, ...eventsUserIds];

      for (let i = 0; i < eventIds.length; i += 1) {
        const $eventId = eventIds[i];

        if ($eventId === null) {
          throw new UserError('some-event-id-is-null');
        }
      }

      const isAdminFor = eventsUserIds.includes(eventId);

      if (!isAdminFor) {
        throw new UserError('is-not-the-admin');
      }
    } catch (err) {
      error('User', 'adminFor', 'byModel', err);
      throw new UserError('is-not-the-admin');
    }
  }
);

const byId: ById = (
  async (user, id, model) => {
    try {
      const Model = await model.load<Models>(id);
      return byModel(user, Model);
    } catch (err) {
      error('User', 'adminFor', 'byId', err);
      throw new UserError('is-not-the-admin');
    }
  }
);

const selectStaticModel = (
  (props: any): BaseModelStatic | undefined => {
    /* eslint-disable object-curly-newline */
    const { eventId, questionId, answerId, likeId } = props;
    const { eventIds, questionIds, answerIds, likeIds } = props;
    /* eslint-enable object-curly-newline */

    if (eventId || eventIds) {
      return statics.models.EventModelStatic;
    }

    if (questionId || questionIds) {
      return statics.models.QuestionModelStatic;
    }

    if (answerId || answerIds) {
      return statics.models.AnswerModelStatic;
    }

    if (likeId || likeIds) {
      return statics.models.LikeModelStatic;
    }

    return undefined;
  }
);

export const adminFor: AdminFor = (
  (user: UserModel, props: Partial<Props>): Promise<any> => {
    /* eslint-disable object-curly-newline */
    const { event, question, answer, like } = props;
    const model = event || question || answer || like;

    const { eventId, questionId, answerId, likeId } = props;
    const modelId = eventId || questionId || answerId || likeId;

    const { eventIds, questionIds, answerIds, likeIds } = props;
    const modelIds = eventIds || questionIds || answerIds || likeIds;
    /* eslint-enable object-curly-newline */

    if (model) {
      return byModel(user, model);
    }

    const modelStatic = selectStaticModel(props);

    if (!modelStatic) {
      error('User', 'adminFor', 'noStaticModelSelected');
      throw new UserError('is-not-the-admin');
    }

    if (modelId) {
      return byId(user, modelId, modelStatic);
    }

    if (modelIds) {
      const promises = [];

      for (let i = 0; i < modelIds.length; i += 1) {
        const $modelId = modelIds[i];
        const promise = byId(user, $modelId, modelStatic);

        promises.push(promise);
      }

      return Promise.all(promises);
    }

    error('User', 'adminFor', 'noArgument');
    throw new UserError('is-not-the-admin');
  }
);

export type adminFor = AdminFor;
