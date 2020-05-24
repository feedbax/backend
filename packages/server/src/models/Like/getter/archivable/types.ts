import type { LikeArchivable } from '@shared/models/like';
import type { LikeModel } from '~models/Like';

export type GetterArchivable = (this: LikeModel) => LikeArchivable;
