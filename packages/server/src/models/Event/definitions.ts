import { defaultSettings } from '@shared/models/event';
import type { Definitions } from './types';

const definitions: Definitions = {
  slug: {
    type: 'string',
    validations: ['notEmpty'],
    index: true,
    unique: true,
  },

  settings: {
    type: 'json',
    defaultValue: defaultSettings,
  },
};

export default definitions;
