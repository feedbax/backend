import type { QuestionModel } from '~models/Question';

type ReturnType = QuestionModel;

export interface Props {
  id: string | null;
  slug: string | null;
  ids: string[];
}

export interface ByIds {
  (ids: Props['ids']): Promise<ReturnType[]>;
}

export interface BySlug {
  (slug: Props['slug']): Promise<ReturnType[]>;
}

export interface ById {
  (id: Props['id']): Promise<ReturnType>;
}

export interface Get {
  (props: Pick<Props, 'id'>): Promise<ReturnType>;
  (props: Pick<Props, 'ids'>): Promise<ReturnType[]>;
  (props: Pick<Props, 'slug'>): Promise<ReturnType[]>;
}
