import redis from 'redis';
import { workerId } from '~main';

import type { RedisClient } from 'redis';
import type { Updates } from './types';
import type { Packet as AddAnswerPacket } from '@shared/packets/server/answer/create';

type AddLikeUpdate = {
  (type: 'answer' | 'question', event: string, modelId: string): Promise<number>;
}

type AddAnswerUpdate = {
  (event: string, answer: AddAnswerPacket): Promise<number>;
}

class UpdateData {
  private dataClient: RedisClient;
  private deleteClaimCache: Set<string>;

  public constructor() {
    this.dataClient = redis.createClient(process.env.REDIS_URL || '');
    this.deleteClaimCache = new Set<string>();
  }

  public claimDeleteIfPossible = (
    async (event: string): Promise<void> => {
      console.log(workerId, 'claimDeleteIfPossible', event);

      console.log(workerId, 'claimDeleteIfPossible', 'deleteClaimCache.has', this.deleteClaimCache.has(event));
      if (this.deleteClaimCache.has(event)) return;

      console.log(workerId, 'claimDeleteIfPossible', 'checkDeleteClaimExists', await this.checkDeleteClaimExists(event));
      if (await this.checkDeleteClaimExists(event)) {
        this.deleteClaimCache.add(event);
        return;
      }

      console.log(workerId, 'claimDeleteIfPossible', 'setDeleteClaim');
      this.setDeleteClaim(event);
    }
  );

  private checkDeleteClaimExists = (
    async (event: string): Promise<boolean> => new Promise(
      (resolve, reject) => {
        this.dataClient.GET(
          `broadcast-updates:delete-claim:${event}`,
          (err, res) => {
            if (err) reject(err);
            if (res === null) resolve(false);
            if (typeof res === 'string') resolve(true);
            reject(new Error('unknown response'));
          },
        );
      },
    )
  );

  private setDeleteClaim = (
    async (event: string): Promise<void> => new Promise(
      (resolve, reject) => {
        this.dataClient.SET(
          `broadcast-updates:delete-claim:${event}`,
          workerId,
          (err) => {
            if (err) reject(err);

            this.deleteClaimCache.add(event);
            resolve();
          },
        );
      },
    )
  );

  private getDeleteClaim = (
    async (event: string): Promise<string> => new Promise(
      (resolve, reject) => {
        this.dataClient.GET(
          `broadcast-updates:delete-claim:${event}`,
          (err, res) => {
            if (err) reject(err);
            resolve(res);
          },
        );
      },
    )
  );

  public get = (
    async (event: string): Promise<Updates> => {
      const newAnswersRaw = await this.smembers(`broadcast-updates:answers:${event}`);
      const newAnswers: AddAnswerPacket[] = newAnswersRaw.map((rawAnswer) => JSON.parse(rawAnswer));

      const updates: Updates = {
        newAnswers,
        likeUpdates: {
          answers: await this.smembers(`broadcast-updates:likes:answer:${event}`),
          questions: await this.smembers(`broadcast-updates:likes:question:${event}`),
        },
      };

      console.log(workerId, 'get', JSON.stringify(updates, null, 1));
      return updates;
    }
  );

  private smembers = (
    async (key: string): Promise<string[]> => (
      new Promise((resolve, reject) => {
        this.dataClient.SMEMBERS(key, (err, entries) => {
          if (err) reject(err);
          resolve(entries);
        });
      })
    )
  );

  public delete = (
    async (event: string): Promise<void> => {
      const claimedWorkerId = await this.getDeleteClaim(event);
      console.log(workerId, 'delete', 'claimedWorkerId', claimedWorkerId);

      if (claimedWorkerId === workerId) {
        await this.del(`broadcast-updates:answers:${event}`);
        await this.del(`broadcast-updates:likes:answer:${event}`);
        await this.del(`broadcast-updates:likes:question:${event}`);
        await this.del(`broadcast-updates:delete-claim:${event}`);
        this.deleteClaimCache.delete(event);
      }
    }
  );

  private del = (
    async (key: string): Promise<number> => (
      new Promise((resolve, reject) => {
        this.dataClient.DEL(key, (err, success) => {
          if (err) reject(err);
          resolve(success);
        });
      })
    )
  );

  public addLikeUpdate: AddLikeUpdate = (
    async (type, event, modelId) => new Promise<number>(
      (resolve, reject) => {
        this.dataClient.SADD(
          `broadcast-updates:likes:${type}:${event}`,
          modelId,
          (err, res) => {
            if (err) reject(err);
            resolve(res);
          },
        );
      },
    )
  );

  public addAnswerUpdate: AddAnswerUpdate = (
    async (event, answer) => new Promise<number>(
      (resolve, reject) => {
        this.dataClient.SADD(
          `broadcast-updates:answers:${event}`,
          JSON.stringify(answer),
          (err, res) => {
            if (err) reject(err);
            resolve(res);
          },
        );
      },
    )
  );
}

export default UpdateData;
