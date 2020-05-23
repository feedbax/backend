import os from 'os';
import cluster, { worker } from 'cluster';
import http from 'http';

import express from 'express';
import redis from 'redis';

import ioServer from 'socket.io';
import socketioParser from 'socket.io-msgpack-parser';
import socketioRedis from 'socket.io-redis';

import type { Socket } from 'net';

const numProcesses = os.cpus().length;
const port = process.env.PORT || 3001;

function getRandomInt(min: number, max: number): number {
  const $min = Math.ceil(min);
  const $max = Math.floor(max);
  return Math.floor(Math.random() * ($max - $min + 1)) + $min;
}

async function run(): Promise<void> {
  if (cluster.isMaster) {
    const workers: cluster.Worker[] = [];

    const spawn = function (i: number): void {
      workers[i] = cluster.fork();

      workers[i].on('exit', () => {
        console.log('respawning worker', i);
        spawn(i);
      });
    };

    for (let i = 0; i < numProcesses; i += 1) {
      spawn(i);
    }

    const serverHttp = http.createServer();

    serverHttp.on('connection', (connection) => {
      connection.pause();

      if (connection.remoteAddress) {
        const $workerIndex = getRandomInt(0, numProcesses - 1);
        const $worker = workers[$workerIndex];

        $worker.send('give-connection', connection);
      }
    });

    serverHttp.listen(port, () => {
      console.log(`Server listening at *:${port}`);
    });
  } else {
    console.log('startup worker', worker.id);

    const { default: getWorkerData } = await import('~lib/worker-data');
    const { startServer, workerId } = await import('~main');

    const serverExpress = express();
    const serverLocal = serverExpress.listen(0, 'localhost');

    type ServerOptions = SocketIO.ServerOptions;
    const serverOptions = { parser: socketioParser } as ServerOptions;
    const serverWs = ioServer(serverLocal, serverOptions);
    const adminNamespace = serverWs.of('/admin');
    const userNamespace = serverWs.of('/user');

    const subClient = redis.createClient(process.env.REDIS_URL || '');
    const pubClient = redis.createClient(process.env.REDIS_URL || '');
    const redisAdapter = socketioRedis({ subClient, pubClient });

    const store = getWorkerData();

    store.serverWs = serverWs;
    store.adminNamespace = adminNamespace;
    store.userNamespace = userNamespace;

    serverWs.adapter(redisAdapter);
    await startServer();

    process.on('message', (message, connection: Socket) => {
      if (message !== 'give-connection') return;

      console.log('handling connection', worker.id, workerId, connection.remoteAddress);
      serverLocal.emit('connection', connection);
      connection.resume();
    });
  }
}

run();
