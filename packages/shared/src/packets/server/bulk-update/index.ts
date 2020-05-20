import type { Packet as AddAnswerPacket } from '~packets/server/answer/create';

export enum PacketKeys {
  newAnswers,
  likeUpdates
}

export enum LikeUpdatesKeys {
  answers,
  questions
}

// branding is necessary to preserve custom type in intellisense
type AnswerId = string & { __brand?: unknown };
type QuestionId = string & { __brand?: unknown };
type LikesCount = number & { __brand?: unknown };

export type NewAnswerUpdates = AddAnswerPacket[];

export type LikeUpdateAnswer = [AnswerId, LikesCount];
export type LikeUpdateQuestion = [QuestionId, LikesCount];

export type LikeUpdates = {
  [LikeUpdatesKeys.questions]: LikeUpdateQuestion[];
  [LikeUpdatesKeys.answers]: LikeUpdateAnswer[];
};

export type Packet = {
  [PacketKeys.newAnswers]: NewAnswerUpdates;
  [PacketKeys.likeUpdates]: LikeUpdates;
};
