import type { AnswerModel } from '~models/Answer';

type ReturnType = AnswerModel;

export interface Props {
  slug: string | null;
  id: string | null;
  ids: string[];
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
