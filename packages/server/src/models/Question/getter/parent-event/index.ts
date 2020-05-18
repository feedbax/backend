import type { GetterParentEvent } from './types';

export const parentEvent: GetterParentEvent = (
  async function () {
    return this.parent;
  }
);

export type parentEvent = GetterParentEvent;
