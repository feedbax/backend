import * as QuestionActions from '~store/modules/questions/types';

import type { EventResolved } from '@shared/models/event';
import type { QuestionResolved } from '@shared/models/question';

export interface AddQuestion {
  (eventId: string, question: QuestionResolved): QuestionActions.AddQuestionAction;
}

export interface AddQuestionsByEvent {
  (event: EventResolved): QuestionActions.AddQuestionsAction;
}

export interface AddAnswer {
  (questionId: string, answerId: string): QuestionActions.AddAnswerAction;
}

export interface IncreaseLikes {
  (questionId: string): QuestionActions.IncreaseLikesAction;
}

export interface IncreaseLikesBy {
  (questionId: string, likesCount: number): QuestionActions.IncreaseLikesByAction;
}

export interface RemoveQuestion {
  (questionId: string): QuestionActions.RemoveQuestionAction;
}

export interface RemoveQuestions {
  (questionIds: string[]): QuestionActions.RemoveQuestionsAction;
}

export interface RemoveAnswer {
  (questionId: string, answerId: string): QuestionActions.RemoveAnswerAction;
}

export interface RemoveAnswers {
  (questionId: string, answerIds: string[]): QuestionActions.RemoveAnswersAction;
}

export interface DecreaseLikes {
  (questionId: string): QuestionActions.DecreaseLikesAction;
}

export interface DecreaseLikesBy {
  (questionId: string, likesCount: number): QuestionActions.DecreaseLikesByAction;
}

export interface SetHasLiked {
  (questionId: string, hasLiked: boolean): QuestionActions.SetHasLikedAction;
}

export interface SetLikes {
  (questionId: string, likes: number): QuestionActions.SetLikesAction;
}
