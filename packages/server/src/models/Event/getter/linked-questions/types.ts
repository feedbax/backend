import type { EventModel } from '~models/Event';
import type { QuestionModel } from '~models/Question';

export type GetterLinkedQuestions = (this: EventModel) => Promise<QuestionModel[]>;
