import { state, updateState } from '../state/state.js';
import { IncomingMessage, ServerResponse } from 'http';
import { StatusCodes, StatusMessages } from '../models/constants.js';
import { consoleResponse } from '../utils/consoleResponse.js';
import { isUserIdValid } from '../utils/isUserIdValid.js';
import { isUserExists } from '../utils/isUserExists.js';
import { User } from '../models/user-interface.js';

process.on('message', (newState: User[]) => {
    updateState(newState);
});

export const getUser = (req: IncomingMessage, res: ServerResponse) => {
    const userId = req.url?.split('/api/users/')[1];

    if (!isUserIdValid(res, userId)) {
        return;
    }

    const user = state.find((person) => person.id === userId);

    if (!isUserExists(res, user)) {
        return;
    }

    res.writeHead(StatusCodes.OK, {
        'Content-Type': 'application/json',
    });
    res.end(JSON.stringify(user));
    consoleResponse(StatusCodes.OK, StatusMessages.OK);
};
