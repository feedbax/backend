import { error } from '~lib/logger';
import statics from '~models/statics';
import { EventError } from '~types/errors';

import type { GetterParent } from './types';

export const parent: GetterParent = (
  async function () {
    try {
      const { UserModelStatic } = statics.models;
      const [userId] = await this.getAll('User');
      return UserModelStatic.get({ id: userId });
    } catch (err) {
      error('EventModel', 'parent', err);
      throw new EventError('parent');
    }
  }
);

export type parent = GetterParent;
