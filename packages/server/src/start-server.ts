import { Nohm } from 'nohm';

import redis from 'redis';
import { worker } from 'cluster';

import flakeUuid from '~lib/flake-uuid';
import registerEvents from '~events/index';

export const workerId = flakeUuid();
export async function startServer(): Promise<void> {
  const clientRedis = redis.createClient(process.env.REDIS_URL || '');
  console.log('start server for', worker?.id || 'no-id', workerId);

  clientRedis.once('ready', async () => {
    Nohm.setClient(clientRedis);
    Nohm.setPrefix('feedbax-dev');

    await registerEvents();
    console.log('server ready for', worker?.id || 'no-id', workerId);
  });
}
