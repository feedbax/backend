import { validateUUIDAsync } from '~lib/validate-uuid';
import type { Definitions } from './types';

const definitions: Definitions = {
  author: {
    type: 'string',
    validations: [validateUUIDAsync],
    index: true,
  },
};

export default definitions;
