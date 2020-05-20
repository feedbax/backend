import { error } from '~lib/logger';
import { EventError } from '~types/errors';

import { EventKeys, EventResolvedFlat } from '@shared/models/event';
import type { GetterResolvedFlat } from './types';

export const resolvedFlat: GetterResolvedFlat = (
  function () {
    try {
      const props = this.allProperties();

      const event: EventResolvedFlat = {
        [EventKeys.id]: props.id,
        [EventKeys.slug]: props.slug,
        [EventKeys.settings]: props.settings,
      };

      return event;
    } catch (err) {
      error('EventModel', 'resolved', err);
      throw new EventError('resolved');
    }
  }
);

export type resolvedFlat = GetterResolvedFlat;
