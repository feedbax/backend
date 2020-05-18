import type { AnswerPropsRequired } from '@shared/models/answer';

import type { QuestionModel } from '~models/Question';
import type { AnswerModel } from '~models/Answer';

type ReturnType = AnswerModel;

export interface Props {
  question: QuestionModel;
  questionId: string | null;
}

export interface WithQuestion {
  (
    question: Props['question'],
    props: AnswerPropsRequired,
    isAdmin: boolean
  ): Promise<ReturnType>;
}

export interface WithQuestionId {
  (
    questionId: Props['questionId'],
    props: AnswerPropsRequired,
    isAdmin: boolean
  ): Promise<ReturnType>;
}

export interface Create {
  (
    props: AnswerPropsRequired,
    data: Pick<Props, 'question'>,
    isAdmin?: boolean
  ): Promise<ReturnType>;

  (
    props: AnswerPropsRequired,
    data: Pick<Props, 'questionId'>,
    isAdmin?: boolean
  ): Promise<ReturnType>;
}
