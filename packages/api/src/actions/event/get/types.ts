import type { FBXAPI } from '~api';
import type { EventResolved } from '@shared/models/event';

export type Props = {
  event: {
    id: string;
  };
};

export type Return = EventResolved;

export interface Get {
  (this: FBXAPI, props: Props): Promise<Return>;
}
