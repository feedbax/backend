import { FBXAPI } from '~api';

import actions, { ApiActions } from '~actions';
import { LoginUser } from '~actions/default/login';

export class FBXAPIUser extends FBXAPI implements ApiActions<'user'> {
  public login: LoginUser = actions.login.bind(this);

  public event = {
    get: actions.event.get.bind(this),
  };

  public question = {};

  public answer = {
    create: actions.answer.create.bind(this),
  };

  public like = {
    toggle: actions.like.toggle.bind(this),
  };

  constructor(url: string) {
    super(url, 'user');
  }
}

export default FBXAPIUser;
