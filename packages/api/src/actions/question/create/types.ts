import type { FBXAPI } from '~api';

import type { QuestionPropsRequired } from '@shared/models/question';
import type { InsertionType } from '@shared/models/question';
import type { AnswerPropsRequired } from '@shared/models/answer';

export interface MaybeAnswers {
  answers?: AnswerPropsRequired[];
}

export type Props = {
  insertionType: InsertionType;
  question: QuestionPropsRequired & MaybeAnswers;
};

export interface Create {
  (this: FBXAPI, props: Props): Promise<undefined>;
}
