import type { AnswerModel } from '~models/Answer';
import type { EventModel } from '~models/Event';

export type GetterParentEvent = (this: AnswerModel) => Promise<EventModel>;
