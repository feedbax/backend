import type { AnswerResolved } from '@shared/models/answer';
import type { AnswerModel } from '~models/Answer';

export type GetterResolved = (answer: AnswerModel, userUUID: string) => Promise<AnswerResolved>;
