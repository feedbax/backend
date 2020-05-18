export type _EventActions = typeof import('./event').default;
export type EventActions<T> = (
  T extends 'admin'
  ? _EventActions
  : Pick<_EventActions, 'get'>
);

export type _QuestionActions = typeof import('./question').default;
export type QuestionActions<T> = (
  T extends 'admin'
  ? _QuestionActions
  : {}
);

export type _AnswerActions = typeof import('./answer').default;
export type AnswerActions<T> = (
  T extends 'admin'
  ? _AnswerActions
  : Pick<_AnswerActions, 'create'>
);

export type LikeActions = typeof import('./like').default;

export type Login = import('./default/login').Login;
export type LogoutAction = typeof import('./default/logout').default;

export interface ApiActions<T extends 'admin' | 'user'> {
  event: EventActions<T>;
  question: QuestionActions<T>;
  answer: AnswerActions<T>;
  like: LikeActions;
  login: Login;
  logout: LogoutAction;
}
