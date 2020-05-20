import type { FBXAPI } from '~api';
import type { EventState } from '~store/modules/event/types';
import type { Response } from '@shared/packets/response/event/destroy';

export type Props = {
  event: PickPartial<EventState, 'id'>;
};

export interface Destroy {
  (this: FBXAPI, props: Props): Promise<Response>;
}

export { Response };
