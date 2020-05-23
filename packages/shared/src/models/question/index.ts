import type { AnswerResolved } from '~models/answer';

export enum QuestionType {
  NONE = 'NONE',
  POLL = 'POLL',
  VOTE = 'VOTE',
}

export const QuestionTypes = [QuestionType.POLL, QuestionType.VOTE];

export enum LikesDisplayType {
  PERCENTAGE = 'PERCENTAGE',
  NUMBER = 'NUMBER',
}

export enum InsertionType {
  APPEND = 'APPEND',
  PREPEND = 'PREPEND',
}

export const LikesDisplayTypes = [
  LikesDisplayType.NUMBER,
  LikesDisplayType.PERCENTAGE,
];

export interface QuestionSettings {
  likesCountDisplayType?: LikesDisplayType;
  newAnswersAllowed?: boolean;
}

export const defaultSettingsVote: QuestionSettings = {
  newAnswersAllowed: true,
};

export const defaultSettingsPoll: QuestionSettings = {
  likesCountDisplayType: LikesDisplayType.PERCENTAGE,
};

type GetDefaultSettings = {
  (props: PickPartial<QuestionProperties, 'type'>): QuestionSettings;
};

export const getDefaultSettings: GetDefaultSettings = (props) => {
  const { type: questionType } = props;

  switch (questionType) {
    case QuestionType.POLL:
      return defaultSettingsPoll;

    case QuestionType.VOTE:
      return defaultSettingsVote;

    default:
      return {};
  }
};

export interface QuestionPropsRequired {
  type: QuestionType;
  text: string;
}

export interface QuestionPropsOptional {
  order: number;
  settings: QuestionSettings;
}

export interface QuestionProperties
  extends QuestionPropsRequired,
    QuestionPropsOptional {}

export enum QuestionKeys {
  id,
  type,
  text,
  order,
  settings,
  answers,
  hasLiked,
  likes,
}

// branding is necessary to preserve custom type in intellisense
type QuestionId = string & { __brand?: unknown };
type QuestionText = string & { __brand?: unknown };
type QuestionOrder = number & { __brand?: unknown };
type QuestionAnswer = AnswerResolved[];
type QuestionLikesCount = number & { __brand?: unknown };
type QuestionHasLiked = boolean & { __brand?: unknown };

export interface QuestionResolvedFlat {
  [QuestionKeys.id]: QuestionId;
  [QuestionKeys.type]: QuestionType;
  [QuestionKeys.text]: QuestionText;
  [QuestionKeys.order]: QuestionOrder;
  [QuestionKeys.settings]: QuestionSettings;
  [QuestionKeys.hasLiked]: QuestionHasLiked;
}

export interface QuestionResolved extends QuestionResolvedFlat {
  [QuestionKeys.answers]: QuestionAnswer;
  [QuestionKeys.likes]: QuestionLikesCount;
}
