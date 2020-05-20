import Packets from '@shared/packets/ids';

import debounce from 'lodash.debounce';
import statics from '~models/statics';
import { userNamespace, adminNamespace } from '~server';

import { PacketKeys, LikeUpdatesKeys } from '@shared/packets/server/bulk-update';
import { LikeUpdates, LikeUpdateAnswer, LikeUpdateQuestion } from '@shared/packets/server/bulk-update';

import type { Packet as AddAnswerPacket } from '@shared/packets/server/answer/create';
import type { Packet as PacketOut } from '@shared/packets/server/bulk-update';
import { AnswerKeys } from '@shared/models/answer';
import { QuestionKeys } from '@shared/models/question';

export enum UpdateAction {
  UpdateLikes,
  AddAnswer
}

type AddAnswerUpdate = {
  action: UpdateAction.AddAnswer;
  payload: AddAnswerPacket;
}

type UpdateLikesUpdate = {
  action: UpdateAction.UpdateLikes;
  payload: {
    questionId: string;
    answerId: string;
  };
}

type Data = AddAnswerUpdate | UpdateLikesUpdate;

type Updates = {
  newAnswers: AddAnswerPacket[];
  likeUpdates: {
    questions: Set<string>;
    answers: Set<string>;
  };
}

class BulkUpdateBroadcast {
  private static updateData = new Map<string, Updates>();
  private static broadcastFn = new Map<string, Function>();

  public static broadcast = (event: string, data: Data): void => {
    if (!BulkUpdateBroadcast.updateData.get(event)) {
      BulkUpdateBroadcast.initUpdateData(event);
    }

    if (!BulkUpdateBroadcast.broadcastFn.get(event)) {
      BulkUpdateBroadcast.initBroadcastFn(event);
    }

    // eslint-disable-next-line default-case
    switch (data.action) {
      case UpdateAction.UpdateLikes: {
        const updateData = BulkUpdateBroadcast.updateData.get(event);

        if (updateData) {
          updateData.likeUpdates.answers.add(data.payload.answerId);
          updateData.likeUpdates.questions.add(data.payload.questionId);
        }

        break;
      }

      case UpdateAction.AddAnswer: {
        const updateData = BulkUpdateBroadcast.updateData.get(event);

        if (updateData) {
          updateData.newAnswers.push(data.payload);
        }

        break;
      }
    }

    const broadcastFn = BulkUpdateBroadcast.broadcastFn.get(event);

    if (broadcastFn) {
      broadcastFn();
    }
  };

  private static initUpdateData = (event: string): void => {
    BulkUpdateBroadcast.updateData.set(event, {
      newAnswers: [],
      likeUpdates: {
        questions: new Set<string>(),
        answers: new Set<string>(),
      },
    });
  };

  private static initBroadcastFn = (event: string): void => {
    const broadcast = BulkUpdateBroadcast.createBroadcastFn(event);
    const debouncedBroadcast = debounce(broadcast, 2000, {
      maxWait: 2000,
    });

    BulkUpdateBroadcast.broadcastFn.set(event, debouncedBroadcast);
  };

  private static createBroadcastFn = (
    (event: string): () => Promise<void> => (
      async (): Promise<void> => {
        const updateData = BulkUpdateBroadcast.updateData.get(event);

        if (updateData) {
          const packetOut: PacketOut = {
            [PacketKeys.newAnswers]: updateData.newAnswers,
            [PacketKeys.likeUpdates]: await BulkUpdateBroadcast.getLikeUpdates(updateData),
          };

          userNamespace
            .to(event)
            .emit(
              Packets.Server.BulkUpdate,
              packetOut,
            );

          adminNamespace
            .to(event)
            .emit(
              Packets.Server.BulkUpdate,
              packetOut,
            );

          BulkUpdateBroadcast.updateData.delete(event);
        }
      }
    )
  );

  private static getLikeUpdates = (
    async (updateData: Updates): Promise<LikeUpdates> => {
      const likeUpdates: LikeUpdates = {
        [LikeUpdatesKeys.questions]: await BulkUpdateBroadcast.getLikeUpdatesQuestion(updateData),
        [LikeUpdatesKeys.answers]: await BulkUpdateBroadcast.getLikeUpdatesAnswer(updateData),
      };

      return likeUpdates;
    }
  );

  private static getLikeUpdatesQuestion = (
    async (updateData: Updates): Promise<LikeUpdateQuestion[]> => {
      const { QuestionModelStatic } = statics.models;

      const questionIds = Array.from(updateData.likeUpdates.questions.values());
      const questionModels = await QuestionModelStatic.get({ ids: questionIds });
      const questionsResolvedPromises = [];

      for (let i = 0; i < questionModels.length; i += 1) {
        const questionModel = questionModels[i];
        const promise = questionModel.resolved;

        questionsResolvedPromises.push(promise);
      }

      const questionsResolved = await Promise.all(questionsResolvedPromises);
      const likeUpdatesAnswer: LikeUpdateQuestion[] = questionsResolved.map(
        (question) => {
          const flatten = <T>(acc: T[], val: T[]): T[] => acc.concat(val);
          const questionLikesDeep = question[QuestionKeys.answers].map(
            (answer) => answer[AnswerKeys.likes],
          );

          const questionLikes = questionLikesDeep.reduce(flatten, []);

          return [question[QuestionKeys.id] || '', questionLikes.length];
        },
      );

      return likeUpdatesAnswer;
    }
  );

  private static getLikeUpdatesAnswer = (
    async (updateData: Updates): Promise<LikeUpdateAnswer[]> => {
      const { AnswerModelStatic } = statics.models;

      const answerIds = Array.from(updateData.likeUpdates.answers.values());
      const answerModels = await AnswerModelStatic.get({ ids: answerIds });
      const answersResolvedPromises = [];

      for (let i = 0; i < answerModels.length; i += 1) {
        const answerModel = answerModels[i];
        const promise = answerModel.resolved;

        answersResolvedPromises.push(promise);
      }

      const answersResolved = await Promise.all(answersResolvedPromises);
      const likeUpdatesAnswer: LikeUpdateAnswer[] = answersResolved.map(
        (answer) => [answer[AnswerKeys.id] || '', answer[AnswerKeys.likes].length],
      );

      return likeUpdatesAnswer;
    }
  );
}

export default BulkUpdateBroadcast;
