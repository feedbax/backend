import type { EventModel } from '~models/Event';

export interface Props {
  event: EventModel;
  eventId: string | null;
}

export interface ByModel {
  (props: Props['event']): Promise<void>;
}

export interface ById {
  (props: Props['eventId']): Promise<void>;
}

export interface Destroy {
  (props: Pick<Props, 'event'>): Promise<void>;
  (props: Pick<Props, 'eventId'>): Promise<void>;
}
