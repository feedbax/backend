import { FBXAPI } from '~api';

import actions, { ApiActions } from '~actions';
import { LoginAdmin } from '~actions/default/login';

export class FBXAPIAdmin extends FBXAPI implements ApiActions<'admin'> {
  public login: LoginAdmin = actions.login.bind(this);

  public event = {
    get: actions.event.get.bind(this),
    create: actions.event.create.bind(this),
    destroy: actions.event.destroy.bind(this),
  };

  public answer = {
    create: actions.answer.create.bind(this),
    destroy: actions.answer.destroy.bind(this),
    edit: actions.answer.edit.bind(this),
    merge: actions.answer.merge.bind(this),
  };

  public question = {
    create: actions.question.create.bind(this),
    destroy: actions.question.destroy.bind(this),
  };

  public like = {
    toggle: actions.like.toggle.bind(this),
  };

  constructor(url: string) {
    super(url, 'admin');
  }
}

export default FBXAPIAdmin;
