import { QuestionType } from '@shared/models/question';
import type { QuestionState } from './state';

type TestQuestion = (Partial<QuestionState> & Pick<QuestionState, 'type'>) | undefined;

const writeAbleTypes: QuestionType[] = [QuestionType.VOTE];
const voteAbleTypes: QuestionType[] = [QuestionType.POLL];
const filterAbleTypes: QuestionType[] = [QuestionType.VOTE];

export const isWriteAble = (question: TestQuestion): boolean => (
  writeAbleTypes.includes(question?.type || QuestionType.NONE)
);

export const isVoteAble = (question: TestQuestion): boolean => (
  voteAbleTypes.includes(question?.type || QuestionType.NONE)
);

export const isFilterAble = (question: TestQuestion): boolean => (
  filterAbleTypes.includes(question?.type || QuestionType.NONE)
);
