import type { QuestionResolved, QuestionArchivable } from '~models/question';

export interface EventSettings {
  showSocialShareButtons?: boolean;
  isReadOnly?: boolean;
  footer?: string;
}

export const defaultSettings: EventSettings = {
  showSocialShareButtons: false,
  isReadOnly: false,
  footer: undefined,
};

export interface EventPropsRequired {
  slug: string;
  endTime: number;
}

export interface EventPropsOptional {
  settings: EventSettings;
}

export interface EventProperties
  extends EventPropsRequired,
    EventPropsOptional {}

export interface EventArchivable extends EventProperties {
  id: string;
  questions: QuestionArchivable[];
  belongsToUser: string;
}

export enum EventKeys {
  id,
  slug,
  settings,
  questions
}

// branding is necessary to preserve custom type in intellisense
type EventId = string & { __brand?: unknown };
type EventSlug = string & { __brand?: unknown };
type EventQuestions = QuestionResolved[];

export interface EventResolvedFlat {
  [EventKeys.id]: EventId;
  [EventKeys.slug]: EventSlug;
  [EventKeys.settings]: EventSettings;
}

export interface EventResolved extends EventResolvedFlat {
  [EventKeys.questions]: EventQuestions;
}
