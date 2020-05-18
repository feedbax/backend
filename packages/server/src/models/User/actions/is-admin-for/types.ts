import type { UserModel } from '~models/User';

import type { BaseModelStatic } from '~models/register';
import type { EventModel } from '~models/Event';
import type { QuestionModel } from '~models/Question';
import type { AnswerModel } from '~models/Answer';
import type { LikeModel } from '~models/Like';

export type Models = EventModel | QuestionModel | AnswerModel | LikeModel;

export type ReturnType = void;

export interface ByModel {
  (user: UserModel, model: Models): Promise<ReturnType>;
}

export interface ById {
  (user: UserModel, modelId: string | null, staticModel: BaseModelStatic): Promise<ReturnType>;
}

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

export interface AdminFor {
  (user: UserModel, props: Pick<Props, 'event'>): Promise<ReturnType>;
  (user: UserModel, props: Pick<Props, 'eventId'>): Promise<ReturnType>;
  (user: UserModel, props: Pick<Props, 'eventIds'>): Promise<ReturnType>;

  (user: UserModel, props: Pick<Props, 'question'>): Promise<ReturnType>;
  (user: UserModel, props: Pick<Props, 'questionId'>): Promise<ReturnType>;
  (user: UserModel, props: Pick<Props, 'questionIds'>): Promise<ReturnType>;

  (user: UserModel, props: Pick<Props, 'answer'>): Promise<ReturnType>;
  (user: UserModel, props: Pick<Props, 'answerId'>): Promise<ReturnType>;
  (user: UserModel, props: Pick<Props, 'answerIds'>): Promise<ReturnType>;

  (user: UserModel, props: Pick<Props, 'like'>): Promise<ReturnType>;
  (user: UserModel, props: Pick<Props, 'likeId'>): Promise<ReturnType>;
  (user: UserModel, props: Pick<Props, 'likeIds'>): Promise<ReturnType>;
}
