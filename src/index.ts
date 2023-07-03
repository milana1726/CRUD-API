import http from 'http';
import 'dotenv/config';
import { getAllUsers } from './controllers/getAllUsers.js';
import { createUser } from './controllers/createUser.js';
import { getUser } from './controllers/getUser.js';
import { StatusCodes, StatusMessages } from './models/constants.js';
import { consoleResponse } from './utils/consoleResponse.js';

const server = http.createServer((req, res) => {
    try {
        if (req.method === 'GET' && req.url === '/api/users') {
            return getAllUsers(req, res);
        }

        if (req.method === 'GET' && req.url?.startsWith('/api/users/')) {
            return getUser(req, res);
        }

        if (req.method === 'POST' && req.url === '/api/users') {
            return createUser(req, res);
        }

        res.writeHead(StatusCodes.NOT_FOUND, {
            'Content-Type': 'application/json',
        });

        res.end(
            JSON.stringify({
                code: StatusCodes.NOT_FOUND,
                message: StatusMessages.NOT_FOUND,
            }),
        );
        consoleResponse(StatusCodes.NOT_FOUND, StatusMessages.NOT_FOUND);
    } catch (err) {
        res.writeHead(StatusCodes.INTERNAL_SERVER_ERROR, {
            'Contenty-Type': 'application/json',
        });

        res.end(
            JSON.stringify({
                code: StatusCodes.INTERNAL_SERVER_ERROR,
                message: StatusMessages.INTERNAL_SERVER_ERROR,
            }),
        );
        console.log('Something went wrong...');
        console.error(err);
        consoleResponse(
            StatusCodes.INTERNAL_SERVER_ERROR,
            StatusMessages.INTERNAL_SERVER_ERROR,
        );
    }
});

server.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});

process.on('SIGINT', () => {
    console.log('Shutting down from SIGINT (Ctrl+C)');
    process.exit();
});
