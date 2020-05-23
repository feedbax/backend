import type { Packet as AddAnswerPacket } from '@shared/packets/server/answer/create';

export enum UpdateAction {
  UpdateLikes,
  AddAnswer
}

export type AddAnswerUpdate = {
  action: UpdateAction.AddAnswer;
  payload: AddAnswerPacket;
}

export type UpdateLikesUpdate = {
  action: UpdateAction.UpdateLikes;
  payload: {
    questionId: string;
    answerId: string;
  };
}

export type Data = AddAnswerUpdate | UpdateLikesUpdate;

export type Updates = {
  newAnswers: AddAnswerPacket[];
  likeUpdates: {
    questions: string[];
    answers: string[];
  };
}
