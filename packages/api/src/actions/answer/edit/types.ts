import type { FBXAPI } from '~api';

import type { AnswerResolved } from '@shared/models/answer';

export type Props = {
  answer: Pick<AnswerResolved, 'id'>;
  newText: string;
};

export interface Edit {
  (this: FBXAPI, props: Props): Promise<undefined>;
}
