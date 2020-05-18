import { RESET_STATE, ResetStateAction } from './types';

// eslint-disable-next-line import/prefer-default-export
export function resetState(): ResetStateAction {
  return { type: RESET_STATE };
}
