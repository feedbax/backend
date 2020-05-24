import { Nohm, NohmModel } from 'nohm';

import { UserModel } from '~models/User';
import { EventModel } from '~models/Event';
import { QuestionModel } from '~models/Question';
import { AnswerModel } from '~models/Answer';
import { LikeModel } from '~models/Like';

import type { IStaticMethods, IDictionary } from 'nohm';

export const UserModelStatic = Nohm.register(UserModel);
export type UserModelStatic = typeof UserModelStatic;

export const EventModelStatic = Nohm.register(EventModel);
export type EventModelStatic = typeof EventModelStatic;

export const QuestionModelStatic = Nohm.register(QuestionModel);
export type QuestionModelStatic = typeof QuestionModelStatic;

export const AnswerModelStatic = Nohm.register(AnswerModel);
export type AnswerModelStatic = typeof AnswerModelStatic;

export const LikeModelStatic = Nohm.register(LikeModel);
export type LikeModelStatic = typeof LikeModelStatic;

export type BaseModelStatic = typeof NohmModel &
  IStaticMethods<NohmModel<IDictionary>>;

export interface NohmModels {
  Event: EventModelStatic;
  Question: QuestionModelStatic;
  Answer: AnswerModelStatic;
  Like: LikeModelStatic;
  User: UserModelStatic;

  [name: string]: BaseModelStatic;
}
