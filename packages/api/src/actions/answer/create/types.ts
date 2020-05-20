import type { FBXAPI } from '~api';

import type { QuestionState } from '~store/modules/questions/types';
import type { AnswerPropsRequired } from '@shared/models/answer';
import type { Response } from '@shared/packets/response/answer/create';

export type Props = {
  question: PickPartial<QuestionState, 'id'>;
  answer: Omit<AnswerPropsRequired, 'author'>;
};

export interface Create {
  (this: FBXAPI, props: Props): Promise<Response>;
}

export { Response };
