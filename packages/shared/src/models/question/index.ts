type AnswerResolved = import('~models/answer').AnswerResolved;

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

export interface QuestionResolvedFlat extends QuestionProperties {
  id: string;
}

export interface QuestionResolved extends QuestionProperties {
  id: string;
  answers: AnswerResolved[];
}
