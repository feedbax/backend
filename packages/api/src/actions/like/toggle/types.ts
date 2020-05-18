import type { FBXAPI } from '~api';
import type { AnswerResolved } from '@shared/models/answer';

export type Props = {
  answer: PickPartial<AnswerResolved, 'id'>;
};

export interface Toggle {
  (this: FBXAPI, props: Props): Promise<undefined>;
}
