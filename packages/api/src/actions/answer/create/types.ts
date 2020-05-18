import type { FBXAPI } from '~api';

import type { QuestionResolved } from '@shared/models/question';
import type { AnswerPropsRequired } from '@shared/models/answer';

export type Props = {
  question: PickPartial<QuestionResolved, 'id'>;
  answer: Omit<AnswerPropsRequired, 'author'>;
};

export interface Create {
  (this: FBXAPI, props: Props): Promise<undefined>;
}
