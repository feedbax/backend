import type { LikeState } from '~store/modules/likes/types';
import type { LikesState } from '~store/modules/likes/types';

export const reducerAddLikes = (prev: LikesState, curr: LikeState): LikesState => ({
  ...prev,
  [curr.id]: {
    ...curr,
  },
});

export const reducerRemoveLikes = (prev: LikesState, curr: string): LikesState => {
  const { [curr]: _removed, ...newState } = prev;
  return newState;
};
