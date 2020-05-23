import { worker } from 'cluster';
import type { Worker } from 'cluster';
import type { Server, Namespace } from 'socket.io';

type WorkerData = {
  serverWs: Server;
  adminNamespace: Namespace;
  userNamespace: Namespace;
}

const workerData = new Map<Worker, WorkerData>();

// eslint-disable-next-line import/prefer-default-export
export default function getWorkerData(): WorkerData {
  if (!workerData.has(worker)) {
    workerData.set(worker, {} as WorkerData);
  }

  const data = workerData.get(worker);
  return data as WorkerData;
}
