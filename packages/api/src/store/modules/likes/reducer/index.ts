import { RESET_STATE } from '~store/types';
import * as ActionTypes from '~store/modules/likes/types/action-types';
import { reducerAddLikes, reducerRemoveLikes } from './helper';

import type { LikesActions } from '~store/modules/likes/types';
import type { LikesState } from '~store/modules/likes/types';

const initialState: LikesState = {};

export default (state = { ...initialState }, action: LikesActions): LikesState => {
  switch (action.type) {
    case ActionTypes.ADD_LIKE: {
      const like = action.payload;

      return {
        ...state,

        [like.id]: {
          ...like,
        },
      };
    }

    case ActionTypes.ADD_LIKES: {
      const likes = action.payload;

      return likes.reduce<LikesState>(
        reducerAddLikes,
        { ...state },
      );
    }

    case ActionTypes.REMOVE_LIKE: {
      const likeIdRemove = action.payload;
      const { [likeIdRemove]: _removed, ...newState } = state;

      return newState;
    }

    case ActionTypes.REMOVE_LIKES: {
      const likeIdsRemove = action.payload;

      return likeIdsRemove.reduce<LikesState>(
        reducerRemoveLikes,
        { ...state },
      );
    }

    case RESET_STATE:
      return { ...initialState };

    default:
      return state;
  }
};
