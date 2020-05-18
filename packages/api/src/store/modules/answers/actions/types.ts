import * as AnswerActions from '~store/modules/answers/types';

import type { AnswerResolved } from '@shared/models/answer';
import type { AnswerResolvedFlat } from '@shared/models/answer';
import type { EventResolved } from '@shared/models/event';

export interface AddAnswersByEvent {
  (event: EventResolved): AnswerActions.AddAnswersAction;
}

export interface AddAnswers {
  (
    eventId: string,
    questionId: string,
    answers: (Partial<AnswerResolved> & AnswerResolvedFlat)[]
  ): AnswerActions.AddAnswersAction;
}

export interface AddAnswer {
  (eventId: string, questionId: string, answer: AnswerResolved): AnswerActions.AddAnswerAction;
}

export interface AddLike {
  (answerId: string, likeId: string): AnswerActions.AddLikeAction;
}

export interface AddLikes {
  (answerId: string, likeIds: string[]): AnswerActions.AddLikesAction;
}

export interface EditAnswer {
  (answer: AnswerResolvedFlat): AnswerActions.EditAnswerAction;
}

export interface RemoveAnswers {
  (answerIds: string[]): AnswerActions.RemoveAnswersAction;
}

export interface RemoveAnswer {
  (answerId: string): AnswerActions.RemoveAnswerAction;
}

export interface RemoveLike {
  (answerId: string, likeId: string): AnswerActions.RemoveLikeAction;
}
