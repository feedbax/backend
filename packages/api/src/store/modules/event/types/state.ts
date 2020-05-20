import type { EventProperties } from '@shared/models/event';

export interface EventState extends EventProperties {
  id: string;
  questions: string[];
}
