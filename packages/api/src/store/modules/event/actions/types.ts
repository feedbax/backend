import * as EventActions from '~store/modules/event/types';

import type { EventResolved } from '@shared/models/event';
import type { QuestionResolved } from '@shared/models/question';

export interface LoadEvent {
  (event: EventResolved): EventActions.LoadEventAction;
}

export interface AddQuestion {
  (question: QuestionResolved): EventActions.AddQuestionAction;
}

export interface RemoveQuestion {
  (questionId: string): EventActions.RemoveQuestionAction;
}
