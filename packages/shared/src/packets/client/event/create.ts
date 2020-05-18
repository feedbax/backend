type EventPropsRequired = import('~models/event').EventPropsRequired;

export interface Packet {
  event: EventPropsRequired;
}
