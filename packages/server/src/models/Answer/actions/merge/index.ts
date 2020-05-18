import { error } from '~lib/logger';
import statics from '~models/statics';
import { AnswerError } from '~types/errors';

import type { AnswerModel } from '~models/Answer';
import type { LikeModel } from '~models/Like';

import type { GetAnswersLikes, GetDistinctLikes } from './types';
import type { GetLikesSubstraction, AddLikesToAnswer } from './types';
import type { RemoveModels, GetIds } from './types';
import type { WithAnswer, WithAnswerId } from './types';
import type { Merge, Props } from './types';

/**
 * Returns `Array<LikeModel>` of the given answers.
 */
const getAnswersLikes: GetAnswersLikes = (
  async (answers) => {
    const answersLikesPromises = [];

    for (let i = 0; i < answers.length; i += 1) {
      const answer = answers[i];
      answersLikesPromises.push(answer.linkedLikes);
    }

    const answersLikesNested = await Promise.all(answersLikesPromises);

    const flatten = <T>(acc: T[], val: T[]): T[] => acc.concat(val);
    const answersLikes = answersLikesNested.reduce(flatten, []);

    return answersLikes;
  }
);

const getDistinctLikes: GetDistinctLikes = (
  (likes) => {
    const checkedLikeAuthors: string[] = [];

    const likesDistinct = likes.filter((_like) => {
      const author = _like.property('author');
      const existsAlready = checkedLikeAuthors.includes(author);

      if (!existsAlready) {
        checkedLikeAuthors.push(author);
      }

      return !existsAlready;
    });

    return likesDistinct;
  }
);

const getLikesSubstraction: GetLikesSubstraction = (
  (allLikes, likesToSub) => {
    const getAuthor = (_l: LikeModel): string => _l.property('author');
    const likeToSubAuthors = likesToSub.map(getAuthor);

    const likesSubstraction: LikeModel[] = [];

    for (let i = 0; i < allLikes.length; i += 1) {
      const allLike = allLikes[i];
      const allLikeAuthor = allLike.property('author');

      const doSubstract = likeToSubAuthors.includes(allLikeAuthor);

      if (!doSubstract) {
        likesSubstraction.push(allLike);
      }
    }

    return likesSubstraction;
  }
);

const addLikesToAnswer: AddLikesToAnswer = (
  async (answer, likes) => {
    const addLikePromises: Promise<LikeModel>[] = [];

    for (let i = 0; i < likes.length; i += 1) {
      const like = likes[i];
      const author = like.property('author');

      const addLikePromise = answer.createLike({ author });
      addLikePromises.push(addLikePromise);
    }

    return Promise.all(addLikePromises);
  }
);

const removeModels: RemoveModels = (
  (models) => {
    const removeLikePromises: Promise<void>[] = [];

    for (let i = 0; i < models.length; i += 1) {
      const like = models[i];
      const removeLikePromise = like.remove();

      removeLikePromises.push(removeLikePromise);
    }

    return Promise.all(removeLikePromises);
  }
);

const getIds: GetIds = (
  (model) => {
    if (model.id === null) throw new Error(`${model.modelName}-id-null`);
    return model.id;
  }
);

const withAnswer: WithAnswer = (
  async (keep, merge) => {
    try {
      const answerId = keep.id;
      const questionId = (await keep.parent).id;

      if (questionId === null) {
        throw new Error('question-id-null');
      }

      if (answerId === null) {
        throw new Error('answer-id-null');
      }

      const context = {
        answer: { id: answerId },
        question: { id: questionId },
      };

      const answerKeepLikes = await keep.linkedLikes;
      const answersMergeLikes = await getAnswersLikes(merge);

      const distinctLikes = getDistinctLikes([
        ...answerKeepLikes,
        ...answersMergeLikes,
      ]);

      const distinctLikesMerge = getLikesSubstraction(
        distinctLikes,
        answerKeepLikes,
      );

      const destroyedLikesIds = answersMergeLikes.map(getIds);
      const destroyedAnswersIds = merge.map(getIds);
      const createdLikesModels = await addLikesToAnswer(keep, distinctLikesMerge);
      const createdLikes = createdLikesModels.map((like) => like.resolved);

      await removeModels(answersMergeLikes);
      await removeModels(merge);

      return {
        context,
        createdLikes,
        destroyedLikesIds,
        destroyedAnswersIds,
      };
    } catch (err) {
      error('Answer', 'merge', 'withAnswer', err);
      throw new AnswerError('merge-with-answer');
    }
  }
);

const withAnswerId: WithAnswerId = (
  async (keepId, mergeIds) => {
    try {
      const { AnswerModelStatic } = statics.models;

      const AnswerKeep = await AnswerModelStatic.get({ id: keepId });
      const answersMergePromises: Promise<AnswerModel>[] = [];

      for (let i = 0; i < mergeIds.length; i += 1) {
        const answerMergeId = mergeIds[i];
        const answerMergePromise = AnswerModelStatic.get({ id: answerMergeId });

        answersMergePromises.push(answerMergePromise);
      }

      const AnswersMerge: AnswerModel[] = await Promise.all(answersMergePromises);

      return withAnswer(AnswerKeep, AnswersMerge);
    } catch (err) {
      error('Answer', 'merge', 'withAnswerId', err);
      throw new AnswerError('merge-with-answer-id');
    }
  }
);

export const merge: Merge = (
  async (props: Partial<Props>) => {
    const { keep, merge: toMerge } = props;
    const { keepId, mergeIds } = props;

    if (keep && toMerge) {
      return withAnswer(keep, toMerge);
    }

    if (keepId && mergeIds) {
      return withAnswerId(keepId, mergeIds);
    }

    error('Answer', 'merge', 'noArgument');
    throw new AnswerError('merge-no-argument');
  }
);

export type merge = Merge;
