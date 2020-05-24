import type { QuestionArchivable } from '@shared/models/question';
import type { QuestionModel } from '~models/Question';

export type GetterArchivable = (this: QuestionModel) => Promise<QuestionArchivable>;
