import {
  AddLikeAction,
  RemoveLikesAction,
  RemoveLikeAction,
  AddLikesAction,
} from '~store/modules/likes/types';

import type { EventResolved } from '@shared/models/event';
import type { LikeResolved } from '@shared/models/like';

type Context<T extends string> = (
  T extends 'add-likes' ? {
    eventId: string;
    questionId: string;
    answerId: string;
  } : (
  T extends 'add-like' ? {
    eventId: string;
    questionId: string;
    answerId: string;
  } : {}
));

export interface AddLikesByEvent {
  (event: EventResolved): AddLikesAction;
}

export interface AddLike {
  (context: Context<'add-like'>, like: LikeResolved): AddLikeAction;
}

export interface AddLikes {
  (context: Context<'add-likes'>, likes: LikeResolved[]): AddLikesAction;
}

export interface RemoveLikes {
  (likeIds: string[]): RemoveLikesAction;
}

export interface RemoveLike {
  (likeId: string): RemoveLikeAction;
}
