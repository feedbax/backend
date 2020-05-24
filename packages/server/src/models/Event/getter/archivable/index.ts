import { error } from '~lib/logger';
import { EventError } from '~types/errors';

import type { EventArchivable } from '@shared/models/event';
import type { GetterArchivable } from './types';

export const archivable: GetterArchivable = (
  async function () {
    try {
      const Questions = await this.linkedQuestions;
      const questions = Questions.map((Question) => Question.archivable);

      const event: EventArchivable = {
        ...this.allProperties(),
        questions: await Promise.all(questions),
      };

      return event;
    } catch (err) {
      error('EventModel', 'archivable', err);
      throw new EventError('archivable');
    }
  }
);

export type archivable = GetterArchivable;
