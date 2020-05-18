import { QuestionType } from '@shared/models/question';
import { hyphenateSync } from 'hyphen/de';

import type { Definitions } from './types';

const definitions: Definitions = {
  order: {
    type: 'number',
    defaultValue: 0,
  },

  type: {
    type: 'string',
    defaultValue: QuestionType.NONE,
  },

  text: {
    validations: ['notEmpty'],
    type: function hyphenate(value): string {
      return hyphenateSync(value);
    },
  },

  settings: {
    type: 'json',
    defaultValue: {},
  },
};

export default definitions;
