import type { $Context, ContextKeys } from '~packets/context';
import type { AnswerResolvedFlat as CreatedAnswer } from '~models/answer';

export type ContextProps = ContextKeys.questionId;
export type Context = (
  Pick<$Context, ContextProps> & {
    // branding is necessary to preserve custom type in intellisense
    __brand?: unknown;
  }
);

export type Packet = [Context, CreatedAnswer];
