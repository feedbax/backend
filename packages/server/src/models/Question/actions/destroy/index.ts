import { error } from '~lib/logger';
import statics from '~models/statics';
import { QuestionError } from '~types/errors';

import type { GetModelId, WithQuestion, WithQuestionId } from './types';
import type { Destroy, Props } from './types';

const getModelId: GetModelId = (
  (model) => {
    if (model.id === null) throw new Error(`${model.modelName}-id-null`);
    return model.id;
  }
);

const flatten = <T>(acc: T[], val: T[]): T[] => acc.concat(val);

const withQuestion: WithQuestion = (
  async (question) => {
    try {
      const destroyedQuestionId = question.id;

      if (destroyedQuestionId === null) {
        throw new Error('question-id-null');
      }

      const answers = await question.linkedAnswers;
      const destroyedAnswersIds = answers.map(getModelId);

      const likesPromise = answers.map((a) => a.linkedLikes);
      const likesNested = await Promise.all(likesPromise);
      const likes = likesNested.reduce(flatten, []);
      const destroyedLikesIds = likes.map(getModelId);

      const allModels = [question, ...answers, ...likes];
      const modelRemovePromises: Promise<void>[] = [];

      for (let i = 0; i < allModels.length; i += 1) {
        const model = allModels[i];
        const promise = model.remove();

        modelRemovePromises.push(promise);
      }

      await Promise.all(modelRemovePromises);

      return {
        destroyedQuestionId,
        destroyedAnswersIds,
        destroyedLikesIds,
      };
    } catch (err) {
      error('Question', 'destroy', 'withQuestion', err);
      throw new QuestionError('destroy-with-question');
    }
  }
);

const withQuestionId: WithQuestionId = (
  async (questionId) => {
    try {
      const { QuestionModelStatic } = statics.models;
      const Question = await QuestionModelStatic.get({ id: questionId });

      return withQuestion(Question);
    } catch (err) {
      error('Question', 'destroy', 'withQuestionId', err);
      throw new QuestionError('destroy-with-question-id');
    }
  }
);

export const destroy: Destroy = (
  async (props: Partial<Props>) => {
    const { question, questionId } = props;

    if (typeof question !== 'undefined') {
      return withQuestion(question);
    }

    if (typeof questionId !== 'undefined') {
      return withQuestionId(questionId);
    }

    error('Question', 'destroy', 'noArgument');
    throw new QuestionError('destroy-no-argument');
  }
);

export type destroy = Destroy;
