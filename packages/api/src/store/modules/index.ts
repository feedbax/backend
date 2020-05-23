import event from './event/reducer';
import * as eventActions from './event/actions';

import questions from './questions/reducer';
import * as questionActions from './questions/actions';

import answers from './answers/reducer';
import * as answerActions from './answers/actions';

export const Actions = {
  Event: eventActions,
  Question: questionActions,
  Answer: answerActions,
};

export default {
  event,
  questions,
  answers,
};
