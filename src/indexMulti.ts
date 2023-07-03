import cluster, { Worker } from 'cluster';
import os from 'os';
import http from 'http';
import path from 'path';

import 'dotenv/config';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

interface ChildServer {
    host: string;
    port: number;
}

cluster.setupPrimary({ exec: path.join(__dirname, 'index.js') });

const cpusCount = os.cpus().length;
const childServers: ChildServer[] = [];
const workers: Worker[] = [];
let nextWorkerIndex = 0;

for (let i = 0; i < cpusCount; i++) {
    const portNumber = Number(process.env.PORT as string) + i + 1;
    const worker = cluster.fork({ PORT: portNumber });
    childServers.push({ host: 'localhost', port: portNumber });
    workers.push(worker);

    worker.on('online', () => {
        console.log(
            `Worker process with pid: ${worker.process.pid} started. Server is listening on port ${portNumber}`,
        );
    });
}

workers.forEach((worker) => {
    worker.on('message', (users) => {
        workers.forEach((worker) => {
            worker.send(users);
        });
    });
});

const loadBalancer = http.createServer((request, response) => {
    const nextWorker = childServers[nextWorkerIndex];

    const proxyRequest = http.request(
        {
            host: nextWorker.host,
            port: nextWorker.port,
            method: request.method,
            path: request.url,
            headers: request.headers,
        },
        (proxyRes) => {
            proxyRes.pipe(response);
        },
    );

    request.pipe(proxyRequest);

    nextWorkerIndex = (nextWorkerIndex + 1) % cpusCount;
});

loadBalancer.listen(process.env.PORT, () => {
    console.log(`Load balancer is running on port ${process.env.PORT}`);
});
