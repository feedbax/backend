import type { FBXAPI } from '~api';

import type { AnswerState } from '~store/modules/answers/types';

export type Props = {
  answer: Pick<AnswerState, 'id'>;
  newText: string;
};

export interface Edit {
  (this: FBXAPI, props: Props): Promise<undefined>;
}
