import type { FBXAPI } from '~api';

export type Props = {
  question: {
    id: string;
  };
};

export interface Destroy {
  (this: FBXAPI, props: Props): Promise<undefined>;
}
