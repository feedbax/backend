import type { AnswerResolvedFlat } from '@shared/models/answer';
import type { AnswerModel } from '~models/Answer';

export type GetterResolvedFlat = (this: AnswerModel) => AnswerResolvedFlat;
