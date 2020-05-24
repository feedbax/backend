import { NohmModel } from 'nohm';
import flake from '~lib/flake-uuid';

import * as getter from './getter';
import * as actions from './actions';

import definitions from './definitions';

import type { LikeProperties, LikeArchivable } from '@shared/models/like';
import type { Definitions } from './types';

// eslint-disable-next-line import/prefer-default-export
export class LikeModel extends NohmModel<LikeProperties> {
  public static modelName = 'Like';
  public static idGenerator = flake;

  protected static definitions: Definitions = definitions;

  public static get = actions.get;

  public get archivable(): LikeArchivable {
    return getter.archivable.bind(this)();
  }
}
