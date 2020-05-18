import type { FBXAPI } from '~api';
import type { EventResolved } from '@shared/models/event';

export type Props = {
  event: PickPartial<EventResolved, 'id'>;
};

export type Return = EventResolved[];

export interface Destroy {
  (this: FBXAPI, props: Props): Promise<Return>;
}
