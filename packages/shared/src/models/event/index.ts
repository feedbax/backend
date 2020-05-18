type QuestionResolved = import('~models/question').QuestionResolved;

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
}

export interface EventPropsOptional {
  settings: EventSettings;
}

export interface EventProperties
  extends EventPropsRequired,
    EventPropsOptional {}

export interface EventResolvedFlat extends EventProperties {
  id: string;
}

export interface EventResolved extends EventProperties {
  id: string;
  questions: QuestionResolved[];
}
