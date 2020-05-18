import type { BaseModelStatic } from '~models/register';

import type { EventModel } from '~models/Event';
import type { QuestionModel } from '~models/Question';
import type { AnswerModel } from '~models/Answer';
import type { LikeModel } from '~models/Like';

export type ReturnType = boolean;
export type Models = EventModel | QuestionModel | AnswerModel | LikeModel;

export type ByModel = (
  (eventId: string, model: Models) => Promise<ReturnType>
);

export type ById = (
  (eventId: string, id: string | null, model: BaseModelStatic) => Promise<ReturnType>
);

export interface Props {
  eventId: string;
  questionId: string;
  answerId: string;
  likeId: string;

  eventIds: string[];
  questionIds: string[];
  answerIds: string[];
  likeIds: string[];

  event: EventModel;
  question: QuestionModel;
  answer: AnswerModel;
  like: LikeModel;
}

export type CheckModel = {
  (eventId: string, props: Pick<Props, 'event'>): Promise<ReturnType>;
  (eventId: string, props: Pick<Props, 'eventId'>): Promise<ReturnType>;
  (eventId: string, props: Pick<Props, 'eventIds'>): Promise<ReturnType[]>;

  (eventId: string, props: Pick<Props, 'question'>): Promise<ReturnType>;
  (eventId: string, props: Pick<Props, 'questionId'>): Promise<ReturnType>;
  (eventId: string, props: Pick<Props, 'questionIds'>): Promise<ReturnType[]>;

  (eventId: string, props: Pick<Props, 'answer'>): Promise<ReturnType>;
  (eventId: string, props: Pick<Props, 'answerId'>): Promise<ReturnType>;
  (eventId: string, props: Pick<Props, 'answerIds'>): Promise<ReturnType[]>;

  (eventId: string, props: Pick<Props, 'like'>): Promise<ReturnType>;
  (eventId: string, props: Pick<Props, 'likeId'>): Promise<ReturnType>;
  (eventId: string, props: Pick<Props, 'likeIds'>): Promise<ReturnType[]>;
};
