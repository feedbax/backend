import { hyphenateSync } from 'hyphen/de';
import { validateUUIDAsync } from '~lib/validate-uuid';
import { Definitions } from './types';

const definitions: Definitions = {
  text: {
    validations: ['notEmpty'],
    type: function hyphenate(value): string {
      return hyphenateSync(value);
    },
  },

  time: {
    type: 'number',
    defaultValue: Date.now,
  },

  author: {
    type: 'string',
    validations: [validateUUIDAsync],
  },
};

export default definitions;
