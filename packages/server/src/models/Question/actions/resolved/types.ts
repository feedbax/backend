import type { QuestionResolved } from '@shared/models/question';
import type { QuestionModel } from '~models/Question';

export type GetterResolved = (
  (question: QuestionModel, userUUID: string) => (
    Promise<QuestionResolved>
  )
);
