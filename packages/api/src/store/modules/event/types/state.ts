import type { EventResolvedFlat } from '@shared/models/event';

export interface EventState extends EventResolvedFlat {
  questions: string[];
}
