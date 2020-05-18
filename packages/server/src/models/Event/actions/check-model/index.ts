import { error } from '~lib/logger';

import { EventError } from '~types/errors';

import { isEventModel } from '~models/Event/types';
import statics from '~models/statics';

import type { BaseModelStatic } from '~models/register';
import type { EventModel } from '~models/Event';

import type { Props, Models } from './types';
import type { ById, ByModel, CheckModel } from './types';

const byModel: ByModel = (
  async (eventId, model) => {
    try {
      let $EventModel: EventModel;

      if (isEventModel(model)) {
        $EventModel = model;
      } else {
        $EventModel = await model.parentEvent;
      }

      const eventIdModel = $EventModel.id;

      if (eventIdModel === null) {
        throw new EventError('check-model--event-id-null');
      }

      return eventIdModel === eventId;
    } catch (err) {
      error('Event', 'checkModel', 'byModel', err);
      throw new EventError('check-model--no-match');
    }
  }
);

const byId: ById = (
  async (eventId, modelId, modelStatic) => {
    try {
      const Model = await modelStatic.load<Models>(modelId);
      return byModel(eventId, Model);
    } catch (err) {
      error('Event', 'checkModel', 'byId', err);
      throw new EventError('check-model--no-match');
    }
  }
);

const selectStaticModel = (
  (props: Partial<Props>): BaseModelStatic | undefined => {
    const { questionId, answerId, likeId } = props;
    const { questionIds, answerIds, likeIds } = props;

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

/**
 * Checks wether the target eventId matches with the given eventId.
 *
 * @param eventIdSource the eventId which should be checked
 * @param props question-, answer- or like-model/id
 */
export const checkModel: CheckModel = (
  (eventIdSource: string, props: Partial<Props>): Promise<any> => {
    /* eslint-disable object-curly-newline */
    const { event, question, answer, like } = props;
    const model = event || question || answer || like;

    const { eventId, questionId, answerId, likeId } = props;
    const modelId = eventId || questionId || answerId || likeId;

    const { eventIds, questionIds, answerIds, likeIds } = props;
    const modelIds = eventIds || questionIds || answerIds || likeIds;
    /* eslint-enable object-curly-newline */


    if (model) {
      return byModel(eventIdSource, model);
    }

    const modelStatic = selectStaticModel(props);

    if (!modelStatic) {
      error('Event', 'checkModel', 'noStaticModelSelected');
      throw new EventError('not-authorized-for-this-event');
    }

    if (modelId) {
      return byId(eventIdSource, modelId, modelStatic);
    }

    if (modelIds) {
      const promises = [];

      for (let i = 0; i < modelIds.length; i += 1) {
        const $modelId = modelIds[i];
        const promise = byId(eventIdSource, $modelId, modelStatic);

        promises.push(promise);
      }

      return Promise.all(promises);
    }

    error('Event', 'checkModel', 'noArgument');
    throw new EventError('check-model--no-match');
  }
);

export type checkModel = CheckModel;
