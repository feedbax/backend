import Packets from '@shared/packets/ids';
import debounce from 'lodash.debounce';
import redis, { RedisClient } from 'redis';

import { workerId } from '~main';
import getWorkerData from '~lib/worker-data';
import statics from '~models/statics';

import { PacketKeys, LikeUpdatesKeys } from '@shared/packets/server/bulk-update';
import { LikeUpdates, LikeUpdateAnswer, LikeUpdateQuestion } from '@shared/packets/server/bulk-update';

import { UpdateAction } from './types';
import UpdateData from './data';

import type { Packet as PacketOut } from '@shared/packets/server/bulk-update';
import type { Updates, Data } from './types';

class BulkUpdateBroadcast {
  private updateData = new UpdateData();
  private broadcastFn = new Map<string, Function>();

  private subClient: RedisClient;
  private pubClient: RedisClient;

  public constructor() {
    this.subClient = redis.createClient(process.env.REDIS_URL || '');
    this.pubClient = redis.createClient(process.env.REDIS_URL || '');

    this.subClient.on('message', (_, event) => {
      if (!this.broadcastFn.get(event)) {
        this.initBroadcastFn(event);
      }

      const broadcastFn = this.broadcastFn.get(event);

      if (broadcastFn) {
        broadcastFn();
      }
    });

    this.subClient.subscribe('TRIGGER_BROADCAST');
  }

  public broadcast = (
    async (event: string, data?: Data): Promise<void> => {
      if (data) {
        this.updateData.claimDeleteIfPossible(event);

        // eslint-disable-next-line default-case
        switch (data.action) {
          case UpdateAction.UpdateLikes: {
            await this.updateData.addLikeUpdate('answer', event, data.payload.answerId);
            await this.updateData.addLikeUpdate('question', event, data.payload.questionId);
            break;
          }

          case UpdateAction.AddAnswer: {
            await this.updateData.addAnswerUpdate(event, data.payload);
            break;
          }
        }
      }

      this.pubClient.publish('TRIGGER_BROADCAST', event);
    }
  );

  private initBroadcastFn = (event: string): void => {
    const broadcast = this.createBroadcastFn(event);
    const debouncedBroadcast = debounce(broadcast, 2000, {
      maxWait: 2000,
    });

    this.broadcastFn.set(event, debouncedBroadcast);
  };

  private createBroadcastFn = (
    (event: string): () => Promise<void> => {
      const removeBroadcastFn = (): boolean => this.broadcastFn.delete(event);
      const debouncedRemove = debounce(removeBroadcastFn, 1000 * 60 * 10 /* 10 minutes */);

      return (
        async (): Promise<void> => {
          const workerData = getWorkerData();
          const updateData = await this.updateData.get(event);

          if (updateData) {
            const packetOut: PacketOut = {
              [PacketKeys.newAnswers]: updateData.newAnswers,
              [PacketKeys.likeUpdates]: await this.getLikeUpdates(updateData),
            };

            workerData
              .userNamespace
              .to(`${workerId}-${event}`)
              .emit(
                Packets.Server.BulkUpdate,
                packetOut,
              );

            workerData
              .adminNamespace
              .to(`${workerId}-${event}`)
              .emit(
                Packets.Server.BulkUpdate,
                packetOut,
              );

            this.updateData.delete(event);
            debouncedRemove();
          }
        }
      );
    }
  );

  private getLikeUpdates = (
    async (updateData: Updates): Promise<LikeUpdates> => {
      const likeUpdates: LikeUpdates = {
        [LikeUpdatesKeys.questions]: await this.getLikeUpdatesQuestion(updateData),
        [LikeUpdatesKeys.answers]: await this.getLikeUpdatesAnswer(updateData),
      };

      return likeUpdates;
    }
  );

  private getLikeUpdatesQuestion = (
    async (updateData: Updates): Promise<LikeUpdateQuestion[]> => {
      const { QuestionModelStatic } = statics.models;

      const questionIds = updateData.likeUpdates.questions;
      const questionModels = await QuestionModelStatic.get({ ids: questionIds });

      const likeUpdatesAnswer: Promise<LikeUpdateQuestion>[] = (
        questionModels.map(
          async (question) => {
            const questionLikes = await question.linkedLikesCount;
            const likeUpdate: LikeUpdateQuestion = [question.id || '', questionLikes];

            return likeUpdate;
          },
        )
      );

      return Promise.all(likeUpdatesAnswer);
    }
  );

  private getLikeUpdatesAnswer = (
    async (updateData: Updates): Promise<LikeUpdateAnswer[]> => {
      const { AnswerModelStatic } = statics.models;

      const answerIds = updateData.likeUpdates.answers;
      const answerModels = await AnswerModelStatic.get({ ids: answerIds });

      const likeUpdatesQuestion: Promise<LikeUpdateAnswer>[] = (
        answerModels.map(
          async (answer) => {
            const answerLikes = await answer.linkedLikesCount;
            const likeUpdate: LikeUpdateAnswer = [answer.id || '', answerLikes];

            return likeUpdate;
          },
        )
      );

      return Promise.all(likeUpdatesQuestion);
    }
  );
}

export default new BulkUpdateBroadcast();
export * from './types';
