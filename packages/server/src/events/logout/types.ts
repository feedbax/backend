import type { EventHandler } from '~events/helper/event-handler';

export interface Handler {
  (this: EventHandler): Promise<void>;
}
