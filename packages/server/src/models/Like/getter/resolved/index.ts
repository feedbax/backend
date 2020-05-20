import type { GetterResolved } from './types';
import { LikeKeys } from '@shared/models/like';

export const resolved: GetterResolved = (
  function () {
    const props = this.allProperties();

    return {
      [LikeKeys.id]: props.id,
      [LikeKeys.author]: props.author,
    };
  }
);

export type resolved = GetterResolved;
