import type { QuestionModel } from '~models/Question';
import type { EventModel } from '~models/Event';

export type GetterParent = (this: QuestionModel) => Promise<EventModel>;
