import type { AnswerModel } from '~models/Answer';

type ReturnType = AnswerModel;

export interface Props {
  answer: AnswerModel;
  answerId: string;
  text: string;
}

export interface WithAnswer {
  (answer: Props['answer'], text: Props['text']): Promise<ReturnType>;
}

export interface WithAnswerId {
  (answerId: Props['answerId'], text: Props['text']): Promise<ReturnType>;
}

export interface Edit {
  (props: Omit<Props, 'answerId'>): Promise<ReturnType>;
  (props: Omit<Props, 'answer'>): Promise<ReturnType>;
}
