import http from 'http';
import 'dotenv/config';
import { getAllUsers } from './controllers/getAllUsers.js';
import { StatusCodes, StatusMessages } from './models/constants.js';
import { consoleResponse } from './utils/consoleResponse.js';

const server = http.createServer((req, res) => {
    try {
        if (req.method === 'GET' && req.url === '/api/users') {
            return getAllUsers(req, res);
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
        res.writeHead(StatusCodes.INTERNAL_SERVER, {
            'Contenty-Type': 'application/json',
        });

        res.end(
            JSON.stringify({
                code: StatusCodes.INTERNAL_SERVER,
                message: StatusMessages.INTERNAL_SERVER,
            }),
        );
        consoleResponse(StatusCodes.INTERNAL_SERVER, StatusMessages.INTERNAL_SERVER);
    }
});

server.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});

process.on('SIGINT', () => {
    console.log('Shutting down from SIGINT (Ctrl+C)');
    process.exit();
});
