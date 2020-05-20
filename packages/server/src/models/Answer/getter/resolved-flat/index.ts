import { error } from '~lib/logger';
import { AnswerError } from '~types/errors';

import type { GetterResolvedFlat } from './types';
import { AnswerKeys } from '@shared/models/answer';

export const resolvedFlat: GetterResolvedFlat = (
  function () {
    try {
      const props = this.allProperties();

      return {
        [AnswerKeys.id]: props.id,
        [AnswerKeys.text]: props.text,
        [AnswerKeys.author]: props.author,
        [AnswerKeys.time]: props.time,
      };
    } catch (err) {
      error('AnswerModel', 'resolved', err);
      throw new AnswerError('resolved');
    }
  }
);

export type resolvedFlat = GetterResolvedFlat;
