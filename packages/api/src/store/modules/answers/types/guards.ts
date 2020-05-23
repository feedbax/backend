/* eslint-disable import/prefer-default-export */

import type { AnswerState } from './state';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isAnswer = (variableToCheck: any): variableToCheck is AnswerState => (
  typeof variableToCheck?.id !== 'undefined'
  && typeof variableToCheck?.eventId !== 'undefined'
  && typeof variableToCheck?.questionId !== 'undefined'
  && typeof variableToCheck?.likes !== 'undefined'
  && typeof variableToCheck?.text !== 'undefined'
  && typeof variableToCheck?.time !== 'undefined'
  && typeof variableToCheck?.hasLiked !== 'undefined'
  && typeof variableToCheck?.isMine !== 'undefined'
);
