import statics from '~models/statics';
import { LikeError } from '~types/errors';
import { error } from '~lib/logger';

import type { LikeModel } from '~models/Like';
import type { AnswerModel } from '~models/Answer';

import type { ById, ByIds, BySlug } from './types';
import type { Get, Props } from './types';

const bySlug: BySlug = (
  async (slug) => {
    try {
      const { EventModelStatic } = statics.models;

      const event = await EventModelStatic.get({ slug });
      const questions = await event.linkedQuestions;

      const answersNestedResolver = questions.map((q) => q.linkedAnswers);
      const answersNested = await Promise.all(answersNestedResolver);
      const answers = new Array<AnswerModel>().concat(...answersNested);

      const likesNestedResolver = answers.map((answer) => answer.linkedLikes);
      const likesNested = await Promise.all(likesNestedResolver);
      const likes = new Array<LikeModel>().concat(...likesNested);

      return likes;
    } catch (err) {
      error('Like', 'get', 'bySlug', err);
      throw new LikeError('get-by-slug');
    }
  }
);

const byIds: ByIds = (
  async (ids) => {
    try {
      const { LikeModelStatic } = statics.models;
      const Likes = await LikeModelStatic.loadMany<LikeModel>(ids);

      return Likes;
    } catch (err) {
      error('Like', 'get', 'byIds', err);
      throw new LikeError('get-by-ids');
    }
  }
);

const byId: ById = (
  async (id) => {
    try {
      const { LikeModelStatic } = statics.models;
      const Like = await LikeModelStatic.load<LikeModel>(id);

      return Like;
    } catch (err) {
      error('Like', 'get', 'byId', err);
      throw new LikeError('get-by-id');
    }
  }
);

export const get: Get = (
  async (props: Partial<Props>): Promise<any> => {
    const { slug, id, ids } = props;

    if (typeof slug !== 'undefined') {
      return bySlug(slug);
    }

    if (typeof ids !== 'undefined') {
      return byIds(ids);
    }

    if (typeof id !== 'undefined') {
      return byId(id);
    }

    error('Like', 'get', 'noArgument');
    throw new LikeError('get-no-argument');
  }
);

export type get = Get;
