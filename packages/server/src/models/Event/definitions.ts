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

  endTime: {
    type: 'number',
    defaultValue: (): number => {
      const now = new Date();

      now.setHours(0);
      now.setMinutes(0);
      now.setSeconds(0);
      now.setMilliseconds(0);

      const timestamp = now.getTime() / 1000;
      const threeDays = 3 * 24 * 60 * 60;

      return timestamp + threeDays;
    },
  },
};

export default definitions;
