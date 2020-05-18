import type { Definitions } from './types';

const definitions: Definitions = {
  email: {
    type: 'string',
    validations: ['email'],
    index: true,
    unique: true,
  },

  password: {
    type: 'string',
    validations: ['notEmpty'],
  },
};

export default definitions;
