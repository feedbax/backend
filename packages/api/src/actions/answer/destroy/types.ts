import type { FBXAPI } from '~api';

import type { AnswerState } from '~store/modules/answers/types';

export type Props = {
  answer: PickPartial<AnswerState, 'id'>;
};

export interface Destroy {
  (this: FBXAPI, props: Props): Promise<undefined>;
}
