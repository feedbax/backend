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
  (
    eventId: string,
    questionId: string,
    answer: Partial<AnswerResolved> & AnswerResolvedFlat,
  ): AnswerActions.AddAnswerAction;
}

export interface IncreaseLikes {
  (answerId: string): AnswerActions.IncreaseLikesAction;
}

export interface IncreaseLikesBy {
  (answerId: string, likesCount: number): AnswerActions.IncreaseLikesByAction;
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

export interface DecreaseLikes {
  (answerId: string): AnswerActions.DecreaseLikesAction;
}

export interface SetHasLiked {
  (answerId: string, hasLiked: boolean): AnswerActions.SetHasLikedAction;
}

export interface SetLikes {
  (answerId: string, likes: number): AnswerActions.SetLikesAction;
}
