import type { AnswerModel } from '~models/Answer';

import type { Context } from '@shared/packets/server/answer/destroy';
import type { DestroyedAnswerId } from '@shared/packets/server/answer/destroy';
import type { DestroyedLikesIds } from '@shared/packets/server/answer/destroy';

type ReturnType = {
  context: Context;
  destroyedAnswerId: DestroyedAnswerId;
  destroyedLikesIds: DestroyedLikesIds;
};

export interface Props {
  answer: AnswerModel;
  answerId: string;
}

export interface WithAnswer {
  (answer: Props['answer']): Promise<ReturnType>;
}

export interface WithAnswerId {
  (answerId: Props['answerId']): Promise<ReturnType>;
}

export interface Destroy {
  (props: Pick<Props, 'answer'>): Promise<ReturnType>;
  (props: Pick<Props, 'answerId'>): Promise<ReturnType>;
}
