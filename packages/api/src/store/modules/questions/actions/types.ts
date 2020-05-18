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

export interface AddLike {
  (questionId: string, likeId: string): QuestionActions.AddLikeAction;
}

export interface AddLikes {
  (questionId: string, likeIds: string[]): QuestionActions.AddLikesAction;
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

export interface RemoveLike {
  (questionId: string, likeId: string): QuestionActions.RemoveLikeAction;
}

export interface RemoveLikes {
  (questionId: string, likeIds: string[]): QuestionActions.RemoveLikesAction;
}
