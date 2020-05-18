import type { GetterResolved } from './types';

export const resolved: GetterResolved = (
  function () {
    return this.allProperties();
  }
);

export type resolved = GetterResolved;
