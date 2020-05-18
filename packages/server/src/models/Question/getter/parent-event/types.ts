import type { QuestionModel } from '~models/Question';
import type { EventModel } from '~models/Event';

export type GetterParentEvent = (this: QuestionModel) => Promise<EventModel>;
