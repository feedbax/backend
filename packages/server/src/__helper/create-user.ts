import 'core-js/stable';
import '~models/register';

import { Nohm } from 'nohm';
import redis from 'redis';
import statics from '~models/statics';

const clientRedis = redis.createClient(process.env.REDIS_URL || '');

export default async function create(): Promise<void> {
  const { UserModelStatic } = statics.models;

  await UserModelStatic.create({
    email: 'konferenz@365steps.de',
    password: 'KyWUtHcpLX2FHRpz',
  });
}

clientRedis.on('ready', () => {
  Nohm.setClient(clientRedis);
  Nohm.setPrefix('feedbax-dev');

  create();
});
