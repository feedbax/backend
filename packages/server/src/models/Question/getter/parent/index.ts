import { error } from '~lib/logger';
import statics from '~models/statics';
import { QuestionError } from '~types/errors';

import type { GetterParent } from './types';

export const parent: GetterParent = (
  async function () {
    try {
      const { EventModelStatic } = statics.models;
      const [eventId] = await this.getAll('Event');
      return EventModelStatic.get({ id: eventId });
    } catch (err) {
      error('QuestionModel', 'parent', err);
      throw new QuestionError('parent');
    }
  }
);

export type parent = GetterParent;
