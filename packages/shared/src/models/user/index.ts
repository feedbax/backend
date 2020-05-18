type EventResolved = import('~models/event').EventResolved;

export interface UserPropsRequired {
  email: string;
  password: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface UserPropsOptional {}

export interface UserProperties extends UserPropsRequired, UserPropsOptional {}

export interface UserResolvedFlat extends UserProperties {
  id: string;
}

export interface UserResolved extends UserProperties {
  id: string;
  events: EventResolved[];
}
