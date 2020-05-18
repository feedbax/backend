import { resetState } from '~store/actions';

import type { Logout } from './types';

const logout: Logout = function () {
  this.socket.disconnect();

  const action = resetState();
  this.store.dispatch(action);
};

export default logout;
export * from './types';
