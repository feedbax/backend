import type { FBXAPI } from '~api';
import type { AnswerState } from '~store/modules/answers/types';
import type { Response } from '@shared/packets/response/like/toggle';

export type Props = {
  answer: PickPartial<AnswerState, 'id'>;
};

export interface Toggle {
  (this: FBXAPI, props: Props): Promise<Response>;
}

export { Response };
