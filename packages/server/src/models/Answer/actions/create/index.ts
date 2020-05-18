import { Nohm } from 'nohm';

import { error } from '~lib/logger';
import statics from '~models/statics';
import { AnswerError } from '~types/errors';
import { QuestionType } from '@shared/models/question';

import type { AnswerPropsRequired } from '@shared/models/answer';
import type { AnswerModel } from '~models/Answer';

import type { WithQuestion, WithQuestionId } from './types';
import type { Create, Props } from './types';

const withQuestion: WithQuestion = (
  async (question, props, isAdmin) => {
    try {
      if (!isAdmin && question.property('type') === QuestionType.POLL) {
        throw new AnswerError('create-with-question.poll-not-allowed');
      }

      const Answer = await Nohm.factory<AnswerModel>('Answer');
      const Event = await question.parent;

      Answer.property(props);
      Answer.link(question);
      Answer.link(Event);

      question.link(Answer);
      await question.save();

      return Answer;
    } catch (err) {
      error('Answer', 'create', 'withQuestion', err);
      throw new AnswerError('create-with-question');
    }
  }
);

const withQuestionId: WithQuestionId = (
  async (questionId, props, isAdmin) => {
    try {
      const { QuestionModelStatic } = statics.models;
      const Question = await QuestionModelStatic.get({ id: questionId });

      return withQuestion(Question, props, isAdmin);
    } catch (err) {
      error('Answer', 'create', 'withQuestionId', err);
      throw new AnswerError('create-with-question-id');
    }
  }
);

export const create: Create = (
  async (
    props: AnswerPropsRequired,
    data: Partial<Props>,
    isAdmin = false,
  ) => {
    const { question, questionId } = data;

    if (typeof question !== 'undefined') {
      return withQuestion(question, props, isAdmin);
    }

    if (typeof questionId !== 'undefined') {
      return withQuestionId(questionId, props, isAdmin);
    }

    error('Answer', 'create', 'noArgument');
    throw new AnswerError('create-no-argument');
  }
);

export type create = Create;
