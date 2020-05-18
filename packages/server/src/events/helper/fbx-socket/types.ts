import type { Socket } from 'socket.io';
import type { UserModel } from '~models/User';
import type { Props, ReturnType } from '~models/Event/actions/check-model/types';

export type AuthData = {
  AdminModel: UserModel;
  browserUUID: string;
  currentEventId: string;
}

export type Auth = {
  auth: Partial<AuthData>;
}

export type GenericAuth<T extends AuthDataKeys> = {
  auth: {
    [P in T]: AuthData[P];
  };
}

export type AuthDataKeys = keyof AuthData;

export type PresetAdminWithEvent = ['currentEventId', 'AdminModel', 'browserUUID'];
export type PresetAdminWithoutEvent = ['AdminModel', 'browserUUID'];
export type PresetUserWithEvent = ['currentEventId', 'browserUUID'];
export type PresetUserWithoutEvent = ['browserUUID'];

export type $FBXSocket<T extends AuthDataKeys> = FBXSocket & GenericAuth<T>;

export type CheckSessionVars = {
  /**
   * Checks wether the toCheck vars are defined in the given socket object.
   * This is a type guard, so if it returns true, you can safely use the checked types.
   *
   * @param socket FBXSocket, you want to check.
   * @param toCheck Array, containing keys of AuthData.
   * @throws `AuthError` if the session is invalid.
   */

  <T extends AuthDataKeys>(socket: FBXSocket, toCheck: T[]): socket is $FBXSocket<T>;
};

export type ModelCheck = {
  /**
   * Checks if the given event is equal to the socket.auth.currentEventId.
   * @throws `AuthError` if the events are not equal.
   */
  (this: FBXSocket, props: Pick<Props, 'event'>): Promise<ReturnType>;

  /**
   * Checks if the given event is equal to the socket.auth.currentEventId.
   * @throws `AuthError` if the events are not equal.
   */
  (this: FBXSocket, props: Pick<Props, 'eventId'>): Promise<ReturnType>;

  /**
   * Checks if the given question belongs to the socket.auth.currentEventId.
   * @throws `AuthError` if it doesn't belong to the current session.
   */
  (this: FBXSocket, props: Pick<Props, 'question'>): Promise<ReturnType>;

  /**
   * Checks if the given question belongs to the socket.auth.currentEventId.
   * @throws `AuthError` if it doesn't belong to the current session.
   */
  (this: FBXSocket, props: Pick<Props, 'questionId'>): Promise<ReturnType>;

  /**
   * Checks if the given question belongs to the socket.auth.currentEventId.
   * @throws `AuthError` if it doesn't belong to the current session.
   */
  (this: FBXSocket, props: Pick<Props, 'questionIds'>): Promise<ReturnType[]>;

  /**
   * Checks if the given answer belongs to the socket.auth.currentEventId.
   * @throws `AuthError` if it doesn't belong to the current session.
   */
  (this: FBXSocket, props: Pick<Props, 'answer'>): Promise<ReturnType>;

  /**
   * Checks if the given answer belongs to the socket.auth.currentEventId.
   * @throws `AuthError` if it doesn't belong to the current session.
   */
  (this: FBXSocket, props: Pick<Props, 'answerId'>): Promise<ReturnType>;

  /**
   * Checks if the given answer belongs to the socket.auth.currentEventId.
   * @throws `AuthError` if it doesn't belong to the current session.
   */
  (this: FBXSocket, props: Pick<Props, 'answerIds'>): Promise<ReturnType[]>;

  /**
   * Checks if the given like belongs to the socket.auth.currentEventId.
   * @throws `AuthError` if it doesn't belong to the current session.
   */
  (this: FBXSocket, props: Pick<Props, 'like'>): Promise<ReturnType>;

  /**
   * Checks if the given like belongs to the socket.auth.currentEventId.
   * @throws `AuthError` if it doesn't belong to the current session.
   */
  (this: FBXSocket, props: Pick<Props, 'likeId'>): Promise<ReturnType>;

  /**
   * Checks if the given like belongs to the socket.auth.currentEventId.
   * @throws `AuthError` if it doesn't belong to the current session.
   */
  (this: FBXSocket, props: Pick<Props, 'likeIds'>): Promise<ReturnType[]>;
};

export type FBXSocket = Socket & Auth & {
  modelBelongsToSession: ModelCheck;
};
