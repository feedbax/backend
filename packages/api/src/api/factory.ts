import FBXAPIUser from './user';
import FBXAPIAdmin from './admin';

import type { Create } from './types';

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/prefer-default-export */

export const create: Create = (url: string, namespace: string): any => {
  if (namespace === 'user') {
    return new FBXAPIUser(url);
  }

  if (namespace === 'admin') {
    return new FBXAPIAdmin(url);
  }

  throw new Error('fbxapi.create.namespace-invalid-or-missing');
};
