import type { FBXAPI } from '~api';
import type { EventResolved } from '@shared/models/event';

export type Event = {
  slug: string;
};

export type Props = {
  event: Event;
};

export type Return = EventResolved[];

export interface Create {
  (this: FBXAPI, props: Props): Promise<Return>;
}
