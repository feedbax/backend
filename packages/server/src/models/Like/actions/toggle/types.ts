import type { $Context, ContextKeys } from '@shared/packets/context';
import type { ToggleActions } from '@shared/models/like';

import type { AnswerModel } from '~models/Answer';
import type { LikeModel } from '~models/Like';

export type Context = Pick<$Context, ContextKeys.answerId | ContextKeys.questionId>;

export type GetContext = (Like: LikeModel) => Promise<Context>;
export type ToggleTuple = [ToggleActions, Context];

export interface Props {
  answer: AnswerModel;
  answerId: string | null;
}

export interface ByAnswer {
  (answer: Props['answer'], author: string): Promise<ToggleTuple>;
}

export interface ByAnswerId {
  (answerId: Props['answerId'], author: string): Promise<ToggleTuple>;
}

export interface Toggle {
  (author: string, props: Pick<Props, 'answer'>): Promise<ToggleTuple>;
  (author: string, props: Pick<Props, 'answerId'>): Promise<ToggleTuple>;
}
