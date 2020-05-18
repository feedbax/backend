import type { LikeResolved } from '@shared/models/like';
import type { LikeModel } from '~models/Like';

export type GetterResolved = (this: LikeModel) => LikeResolved;
