import type { EventModel } from '~models/Event';
import type { QuestionModel } from '~models/Question';
import type { AnswerModel } from '~models/Answer';
import type { LikeModel } from '~models/Like';

type ReturnType = void;

export interface AdminFor {
  /**
   * Checks if the user is the admin of the EventModel.
   *
   * @param props - `{ event: EventModel }`
   * @returns void
   * @throws `UserError` if the user is not an admin of the model.
   */
  (props: { event: EventModel }): Promise<ReturnType>;

  /**
   * Checks if the user is the admin of the EventModel belonging to the given eventId.
   *
   * @param props - `{ eventId: string }`
   * @returns void
   * @throws `UserError` if the user is not an admin of the model.
   */
  (props: { eventId: string }): Promise<ReturnType>;

  /**
   * Checks if the user is the admin of the EventModels belonging to the given eventIds.
   *
   * @param props - `{ eventIds: string[] }`
   * @returns void
   * @throws `UserError` if the user is not an admin of the model.
   */
  (props: { eventIds: string[] }): Promise<ReturnType>;

  /**
   * Checks if the user is the admin of the given QuestionModel.
   *
   * @param props - `{ question: QuestionModel }`
   * @returns void
   * @throws `UserError` if the user is not an admin of the model.
   */
  (props: { question: QuestionModel }): Promise<ReturnType>;

  /**
   * Checks if the user is the admin of the QuestionModel belonging to the given questionId.
   *
   * @param props - `{ questionId: string }`
   * @returns void
   * @throws `UserError` if the user is not an admin of the model.
   */
  (props: { questionId: string }): Promise<ReturnType>;

  /**
   * Checks if the user is the admin of the QuestionModels belonging to the given questionIds.
   *
   * @param props - `{ questionIds: string[] }`
   * @returns void
   * @throws `UserError` if the user is not an admin of the model.
   */
  (props: { questionIds: string[] }): Promise<ReturnType>;

  /**
   * Checks if the user is the admin of the given AnswerModel.
   *
   * @param props - `{ answer: AnswerModel }`
   * @returns void
   * @throws `UserError` if the user is not an admin of the model.
   */
  (props: { answer: AnswerModel }): Promise<ReturnType>;

  /**
   * Checks if the user is the admin of the AnswerModel belonging to the given answerId.
   *
   * @param props - `{ answerId: string }`
   * @returns void
   * @throws `UserError` if the user is not an admin of the model.
   */
  (props: { answerId: string }): Promise<ReturnType>;

  /**
   * Checks if the user is the admin of the AnswerModel belonging to the given answerIds.
   *
   * @param props - `{ answerIds: string[] }`
   * @returns void
   * @throws `UserError` if the user is not an admin of the model.
   */
  (props: { answerIds: string[] }): Promise<ReturnType>;

  /**
   * Checks if the user is the admin of the given LikeModel.
   *
   * @param props - `{ like: LikeModel }`
   * @returns void
   * @throws `UserError` if the user is not an admin of the model.
   */
  (props: { like: LikeModel }): Promise<ReturnType>;

  /**
   * Checks if the user is the admin of the LikeModel belonging to the given likeId.
   *
   * @param props - `{ likeId: string }`
   * @returns void
   * @throws `UserError` if the user is not an admin of the model.
   */
  (props: { likeId: string }): Promise<ReturnType>;

  /**
   * Checks if the user is the admin of the LikeModel belonging to the given likeIds.
   *
   * @param props - `{ likeIds: string[] }`
   * @returns void
   * @throws `UserError` if the user is not an admin of the model.
   */
  (props: { likeIds: string[] }): Promise<ReturnType>;
}
