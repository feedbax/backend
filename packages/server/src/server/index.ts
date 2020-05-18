import socketioParser from 'socket.io-msgpack-parser';
import socketioRedis from 'socket.io-redis';

import http from 'http';
import express from 'express';

import redis from 'redis';
import ioServer from 'socket.io';

type ServerOptions = SocketIO.ServerOptions;
const serverOptions = { parser: socketioParser } as ServerOptions;

export const serverExpress = express();
export const serverHttp = http.createServer(serverExpress);
export const serverWs = ioServer(serverHttp, serverOptions);

const subClient = redis.createClient(process.env.REDIS_URL || '');
const pubClient = redis.createClient(process.env.REDIS_URL || '');
const redisAdapter = socketioRedis({ subClient, pubClient });

serverWs.adapter(redisAdapter);

export const adminNamespace = serverWs.of('/admin');
export const userNamespace = serverWs.of('/user');
