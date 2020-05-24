import { Nohm } from 'nohm';

import type { EventModelStatic } from './register';
import type { QuestionModelStatic } from './register';
import type { AnswerModelStatic } from './register';
import type { LikeModelStatic } from './register';
import type { UserModelStatic } from './register';
import type { NohmModels } from './register';

export interface StaticModels {
  EventModelStatic: EventModelStatic;
  QuestionModelStatic: QuestionModelStatic;
  AnswerModelStatic: AnswerModelStatic;
  LikeModelStatic: LikeModelStatic;
  UserModelStatic: UserModelStatic;
}

export default {
  get models(): StaticModels {
    const models = Nohm.getModels() as NohmModels;

    return {
      EventModelStatic: models.Event,
      QuestionModelStatic: models.Question,
      AnswerModelStatic: models.Answer,
      LikeModelStatic: models.Like,
      UserModelStatic: models.User,
    };
  },
};
