import type { EventResolved } from '~models/event';

export interface UserPropsRequired {
  email: string;
  password: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface UserPropsOptional {}

export interface UserProperties extends UserPropsRequired, UserPropsOptional {}

export enum UserKeys {
  id,
  email,
  events
}

// branding is necessary to preserve custom type in intellisense
export type UserId = string & { __brand?: unknown };
export type UserEmail = string & { __brand?: unknown };
export type UserEvents = EventResolved[];

export interface UserResolvedFlat {
  [UserKeys.id]: UserId;
  [UserKeys.email]: UserEmail;
}

export interface UserResolved extends UserResolvedFlat {
  [UserKeys.events]: UserEvents;
}
