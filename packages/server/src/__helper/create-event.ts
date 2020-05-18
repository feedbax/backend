/* eslint-disable no-await-in-loop */
import bcrypt from 'bcryptjs';

import statics from '~models/statics';
import { QuestionType } from '@shared/models/question';

import type { UserModel } from '~models/User';

type Event = {
  slug: string;
  questions: {
    type: string;
    order: number;
    text: string;
    answers: {
      text: string;
      time?: number;
      author: string;
    }[];
  }[];
};

interface Consume {
  event: Event;
  user?: {
    email: string;
    password: string;
  };
}

const getQuestionType = (type: string): QuestionType => {
  switch (type) {
    case 'POLL':
      return QuestionType.POLL;

    case 'VOTE':
      return QuestionType.VOTE;

    default:
      return QuestionType.NONE;
  }
};

export default async function create(props: Consume): Promise<void> {
  const { UserModelStatic } = statics.models;

  let user: UserModel;

  if (typeof props.user === 'undefined') {
    user = await UserModelStatic.create({
      email: 'demo@demo.de',
      password: await bcrypt.hash('demo', 10),
    });
  } else {
    user = await UserModelStatic.get(props.user);
  }

  const event = await user.createEvent({
    slug: props.event.slug,
    settings: {},
  });

  for (let i = 0; i < props.event.questions.length; i += 1) {
    const { answers, ...qData } = props.event.questions[i];
    const now = Date.now();

    const question = await event.createQuestion({
      ...qData,
      type: getQuestionType(qData.type),
    });

    for (let j = 0; j < answers.length; j += 1) {
      const answer = answers[j];
      answer.time = now - i - j;

      await question.createAnswer(answer, true);
    }
  }
}
