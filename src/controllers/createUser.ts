import { IncomingMessage, ServerResponse } from 'http';
import { User } from '../models/user-interface.js';
import { v4 as uuidv4 } from 'uuid';
import { state } from '../state/state.js';
import { StatusCodes, StatusMessages } from '../models/constants.js';
import { consoleResponse } from '../utils/consoleResponse.js';
import { isBodyValid } from '../utils/isBodyValid.js';
import { RequestBody } from '../models/request-body-interface.js';

export const createUser = (req: IncomingMessage, res: ServerResponse) => {
    let body = '';

    req.on('data', (chunk) => {
        body += chunk.toString();
    });

    req.on('end', () => {
        const userData: RequestBody = JSON.parse(body);

        if (isBodyValid(res, userData)) {
            const newUser: User = {
                id: uuidv4(),
                username: userData.username,
                age: userData.age,
                hobbies: userData.hobbies,
            };

            if (process.send) {
                process.send([...state, newUser]);
            } else {
                state.push(newUser);
            }

            res.writeHead(StatusCodes.CREATED, {
                'Content-Type': 'application/json',
            });
            consoleResponse(StatusCodes.CREATED, StatusMessages.CREATED);
            return res.end(JSON.stringify(newUser));
        }

        res.writeHead(StatusCodes.BAD_REQUEST, {
            'Content-Type': 'application/json',
        });
        res.end(
            JSON.stringify({
                code: StatusCodes.BAD_REQUEST,
                message: StatusMessages.BAD_REQUEST,
            }),
        );
        consoleResponse(StatusCodes.BAD_REQUEST, StatusMessages.BAD_REQUEST);
    });
};
