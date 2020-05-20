import type { FBXAPI } from '~api';
import type { Response } from '@shared/packets/response/event/create';

export type Event = {
  slug: string;
};

export type Props = {
  event: Event;
};

export interface Create {
  (this: FBXAPI, props: Props): Promise<Response>;
}

export { Response };
