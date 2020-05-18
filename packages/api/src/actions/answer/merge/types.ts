import type { FBXAPI } from '~api';

export type Props = {
  answer: {
    keepId: string;
    mergeIds: string[];
  };
};

export interface Merge {
  (this: FBXAPI, props: Props): Promise<undefined>;
}
