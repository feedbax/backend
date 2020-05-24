import type { LikeModel } from '~models/Like';

type ReturnType = LikeModel;

export interface Props {
  id: string | null;
  ids: string[];
  slug: string | null;
}

export interface BySlug {
  (slug: Props['slug']): Promise<ReturnType[]>;
}

export interface ByIds {
  (ids: Props['ids']): Promise<ReturnType[]>;
}

export interface ById {
  (id: Props['id']): Promise<ReturnType>;
}

export interface Get {
  (props: Pick<Props, 'id'>): Promise<ReturnType>;
  (props: Pick<Props, 'ids'>): Promise<ReturnType[]>;
  (props: Pick<Props, 'slug'>): Promise<ReturnType[]>;
}
