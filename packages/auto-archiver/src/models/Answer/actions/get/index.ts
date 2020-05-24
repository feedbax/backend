import statics from '~models/statics';
import { AnswerError } from '~types/errors';
import { error } from '~lib/logger';

import type { AnswerModel } from '~models/Answer';

import type { BySlug, ById, ByIds } from './types';
import type { Get, Props } from './types';

const bySlug: BySlug = (
  async (slug) => {
    try {
      const { EventModelStatic } = statics.models;

      const event = await EventModelStatic.get({ slug });
      const questions = await event.linkedQuestions;
      const questionAnswersResolver = questions.map((q) => q.linkedAnswers);
      const questionAnswers = await Promise.all(questionAnswersResolver);
      const answers: AnswerModel[] = [];

      return answers.concat(...questionAnswers);
    } catch (err) {
      error('Answer', 'get', 'bySlug', err);
      throw new AnswerError('get-by-slug');
    }
  }
);

const byIds: ByIds = (
  async (ids) => {
    try {
      const { AnswerModelStatic } = statics.models;
      const Answers = await AnswerModelStatic.loadMany<AnswerModel>(ids);

      return Answers;
    } catch (err) {
      error('Answer', 'get', 'byIds', err);
      throw new AnswerError('get-by-ids');
    }
  }
);

const byId: ById = (
  async (id) => {
    try {
      const { AnswerModelStatic } = statics.models;
      const Answer = await AnswerModelStatic.load<AnswerModel>(id);

      return Answer;
    } catch (err) {
      error('Answer', 'get', 'byId', err);
      throw new AnswerError('get-by-id');
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

    error('Answer', 'get', 'noArgument');
    throw new AnswerError('get-no-argument');
  }
);

export type get = Get;
