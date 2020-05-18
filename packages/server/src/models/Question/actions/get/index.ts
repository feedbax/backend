import statics from '~models/statics';
import { error } from '~lib/logger';
import { QuestionError } from '~types/errors';

import type { QuestionModel } from '~models/Question';

import type { ById, ByIds, BySlug } from './types';
import type { Get, Props } from './types';

const byIds: ByIds = (
  async (ids) => {
    try {
      const { QuestionModelStatic } = statics.models;
      return QuestionModelStatic.loadMany<QuestionModel>(ids);
    } catch (err) {
      error('Question', 'get', 'byIds', err);
      throw new QuestionError('get-by-ids');
    }
  }
);

const bySlug: BySlug = (
  async (slug) => {
    try {
      const { EventModelStatic } = statics.models;

      const event = await EventModelStatic.get({ slug });
      const questions = await event.linkedQuestions;

      return questions;
    } catch (err) {
      error('Question', 'get', 'bySlug', err);
      throw new QuestionError('get-by-slug');
    }
  }
);

const byId: ById = (
  async (id) => {
    try {
      const { QuestionModelStatic } = statics.models;
      return QuestionModelStatic.load<QuestionModel>(id);
    } catch (err) {
      error('Question', 'get', 'byId', err);
      throw new QuestionError('get-by-id');
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

    error('Question', 'get', 'noArgument');
    throw new QuestionError('get-no-argument');
  }
);

export type get = Get;
