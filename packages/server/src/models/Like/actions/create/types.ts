import type { AnswerModel } from '~models/Answer';
import type { LikeModel } from '~models/Like';
import type { LikeProperties } from '@shared/models/like';

export interface Props {
  answer: AnswerModel;
}

export interface WithAnswer {
  (input: { answer: Props['answer']; props: LikeProperties }): Promise<LikeModel>;
}

export interface Create {
  (props: LikeProperties, data: Pick<Props, 'answer'>): Promise<LikeModel>;
}
