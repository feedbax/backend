import bcrypt from 'bcryptjs';
import type { Definitions } from './types';

const definitions: Definitions = {
  email: {
    type: 'string',
    validations: ['email'],
    index: true,
    unique: true,
  },

  password: {
    defaultValue: '',
    type: (value): string => bcrypt.hashSync(value, 10),
    validations: [
      {
        name: 'length',
        options: {
          min: 8,
        },
      },
    ],
  },
};

export default definitions;
