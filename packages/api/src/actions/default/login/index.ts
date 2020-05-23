import Packets from '@shared/packets/ids';

import getLoginUUID from '~lib/get-uuid';
import { Actions } from '~store/modules';

import type { EventResolved } from '@shared/models/event';
import type { EventResolvedFlat } from '@shared/models/event';

import type { Packet as LoginUserPacket } from '@shared/packets/client/login/user';
import type { Packet as LoginAdminPacket } from '@shared/packets/client/login/admin';

import type { Login, LoginUser, LoginAdmin } from './types';

const loginUser: LoginUser = async function ({ event }) {
  const data: LoginUserPacket = {
    event,
    user: {
      uuid: this.uuid,
    },
  };

  return this.sendPacket<LoginUserPacket, EventResolved>({
    id: Packets.Client.User.Login,
    data,
  }).then((res) => {
    this.store.dispatchAll(
      Actions.Event.loadEvent(res),
      Actions.Question.addQuestionsByEvent(res),
      Actions.Answer.addAnswersByEvent(res),
    );

    return res;
  });
};

const loginAdmin: LoginAdmin = async function ({ user }) {
  const data: LoginAdminPacket = {
    user: {
      ...user,
      uuid: this.uuid,
    },
  };

  return this.sendPacket<LoginAdminPacket, EventResolvedFlat[]>({
    id: Packets.Client.Admin.Login,
    data,
  });
};

const login: Login = async function (props) {
  const { user, event } = props;

  const { email, password } = user || {};
  const { slug } = event || {};

  this.uuid = await getLoginUUID(props);
  this.socket.connect();

  if (slug) {
    return loginUser.bind(this)({
      event: { slug },
    });
  }

  if (email && password) {
    return loginAdmin.bind(this)({
      user: {
        email,
        password,
      },
    });
  }

  throw new Error('fbxapi.actions.login.no-arguments');
};

export default login;
export * from './types';
