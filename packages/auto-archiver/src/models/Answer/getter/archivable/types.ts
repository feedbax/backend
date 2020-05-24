import type { AnswerArchivable } from '@shared/models/answer';
import type { AnswerModel } from '~models/Answer';

export type GetterArchivable = (this: AnswerModel) => Promise<AnswerArchivable>;
