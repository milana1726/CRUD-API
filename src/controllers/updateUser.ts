/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { IncomingMessage, ServerResponse } from 'http';
import { state, updateState } from '../state/state.js';
import { StatusCodes, StatusMessages } from '../models/constants.js';
import { consoleResponse } from '../utils/consoleResponse.js';
import { isBodyValid } from '../utils/isBodyValid.js';
import { isUserIdValid } from '../utils/isUserIdValid.js';
import { isUserExists } from '../utils/isUserExists.js';
import { User } from '../models/user-interface.js';

process.on('message', (newState: User[]) => {
    updateState(newState);
});

export function updateUser(req: IncomingMessage, res: ServerResponse) {
    const userId = req.url?.split('/api/users/')[1];

    if (!isUserIdValid(res, userId)) {
        return;
    }

    const user = state.find((person) => person.id === userId);

    if (!isUserExists(res, user)) {
        return false;
    }

    let body = '';
    req.on('data', (chunk) => {
        body += chunk;
    });
    req.on('end', () => {
        const userData = JSON.parse(body);
        if (isBodyValid(res, userData)) {
            user!.username = userData.username;
            user!.age = userData.age;
            user!.hobbies = userData.hobbies;
        }

        if (process.send) {
            process.send(state);
        }

        res.writeHead(StatusCodes.OK, {
            'Content-Type': 'application/json',
        });
        consoleResponse(StatusCodes.OK, StatusMessages.OK);
        return res.end(JSON.stringify(user));
    });
}
