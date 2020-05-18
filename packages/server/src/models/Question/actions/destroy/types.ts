import type { DestroyedQuestionId } from '@shared/packets/server/question/destroy';
import type { DestroyedAnswersIds } from '@shared/packets/server/question/destroy';
import type { DestroyedLikesIds } from '@shared/packets/server/question/destroy';

import type { NohmModel } from 'nohm';
import type { QuestionModel } from '~models/Question';

export type ReturnType = {
  destroyedQuestionId: DestroyedQuestionId;
  destroyedAnswersIds: DestroyedAnswersIds;
  destroyedLikesIds: DestroyedLikesIds;
};

export type GetModelId = {
  <T extends NohmModel>(model: T): string;
}

export interface Props {
  question: QuestionModel;
  questionId: string;
}

export interface WithQuestion {
  (question: Props['question']): Promise<ReturnType>;
}

export interface WithQuestionId {
  (questionId: Props['questionId']): Promise<ReturnType>;
}

export interface Destroy {
  (props: Pick<Props, 'question'>): Promise<ReturnType>;
  (props: Pick<Props, 'questionId'>): Promise<ReturnType>;
}
