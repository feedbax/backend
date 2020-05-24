import type { GetterArchivable } from './types';

export const archivable: GetterArchivable = (
  function () {
    return this.allProperties();
  }
);

export type archivable = GetterArchivable;
