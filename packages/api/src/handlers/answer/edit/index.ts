import { Actions } from '~store/modules';

import type { Edit } from './types';

const handler: Edit = function (answer) {
  const action = Actions.Answer.editAnswer(answer);
  this.store.dispatchAll(action);
};

export default handler;
export * from './types';
