import { Actions } from '~store/modules';
import { ContextKeys as C } from '@shared/packets/context';
import { AnswerKeys as A } from '@shared/models/answer';
import { PacketKeys as _, LikeUpdatesKeys as L } from '@shared/packets/server/bulk-update';

import type { Create } from './types';

const handler: Create = function (bulk) {
  const { api } = this.store.getState();
  const { event } = api;

  const { id: eventId } = event;

  const {
    [_.newAnswers]: newAnswers,
    [_.likeUpdates]: likeUpdates,
  } = bulk;

  const actions = [];

  for (let i = 0; i < newAnswers.length; i += 1) {
    const newAnswer = newAnswers[i];

    const [context, answer] = newAnswer;

    const {
      [C.questionId]: questionId,
    } = context;

    actions.push(
      Actions.Answer.addAnswer(eventId, questionId, answer),
      Actions.Question.addAnswer(questionId, answer[A.id]),
    );
  }

  const {
    [L.answers]: answerLikesUpdates,
    [L.questions]: questionLikesUpdates,
  } = likeUpdates;

  for (let i = 0; i < answerLikesUpdates.length; i += 1) {
    const answerLikesUpdate = answerLikesUpdates[i];
    const [answerId, likes] = answerLikesUpdate;

    actions.push(
      Actions.Answer.setLikes(answerId, likes),
    );
  }

  for (let i = 0; i < questionLikesUpdates.length; i += 1) {
    const questionLikesUpdate = questionLikesUpdates[i];
    const [questionId, likes] = questionLikesUpdate;

    actions.push(
      Actions.Question.setLikes(questionId, likes),
    );
  }

  this.store.dispatchAll(...actions);
};

export default handler;
export * from './types';
