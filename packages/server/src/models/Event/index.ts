import { NohmModel } from 'nohm';

import { InsertionType } from '@shared/models/question';

import flake from '~lib/flake-uuid';
import statics from '~models/statics';

import definitions from './definitions';

import * as actions from './actions';
import * as getter from './getter';

import type { AnswerProperties } from '@shared/models/answer';
import type { EventProperties, EventResolvedFlat, EventArchivable } from '@shared/models/event';
import type { QuestionProperties } from '@shared/models/question';

import type { QuestionModel } from '~models/Question';

import type { Definitions, CreateQuestion, Resolved } from './types';

// eslint-disable-next-line import/prefer-default-export
export class EventModel extends NohmModel<EventProperties> {
  public static modelName = 'Event';
  public static idGenerator = flake;

  public static get = actions.get;
  public static create = actions.create;
  public static destroy = actions.destroy;
  public static checkModel = actions.checkModel;
  public static resolved = actions.resolved;

  protected static definitions: Definitions = definitions;

  public get archivable(): Promise<EventArchivable> {
    return getter.archivable.bind(this)();
  }

  public get resolvedFlat(): EventResolvedFlat {
    return getter.resolvedFlat.bind(this)();
  }

  public get linkedQuestions(): Promise<QuestionModel[]> {
    return getter.linkedQuestions.bind(this)();
  }

  public resolved: Resolved = (
    (userUUID) => EventModel.resolved(this, userUUID)
  );

  public createQuestion: CreateQuestion = (
    async (props, insertionType = InsertionType.APPEND) => {
      const { QuestionModelStatic } = statics.models;

      const Questions = await this.linkedQuestions;
      const orders = Questions.map((_q) => _q.property('order'));

      type Props = QuestionProperties & { answers?: Partial<AnswerProperties>[] };
      const $props: Props = {
        ...props,
        order: 0,
        settings: {},
      };

      if (insertionType === InsertionType.APPEND) {
        if (orders.length === 0) orders.push(-1);
        const orderMax = Math.max(...orders);

        $props.order = orderMax + 1;
      }

      if (insertionType === InsertionType.PREPEND) {
        if (orders.length === 0) orders.push(1);
        const orderMin = Math.min(...orders);

        $props.order = orderMin - 1;
      }

      if ($props.answers) {
        delete $props.answers;
      }

      return QuestionModelStatic.create($props, { event: this });
    }
  );
}
