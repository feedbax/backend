import type { QuestionPropsRequired } from '@shared/models/question';

import type { EventModel } from '~models/Event';
import type { QuestionModel } from '~models/Question';

export type ReturnType = QuestionModel;

export interface Props {
  event: EventModel;
}

export interface WithEvent {
  (event: Props['event'], props: QuestionPropsRequired): Promise<ReturnType>;
}

export interface Create {
  (props: QuestionPropsRequired, data: Pick<Props, 'event'>): Promise<ReturnType>;
}
