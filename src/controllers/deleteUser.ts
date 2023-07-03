import { IncomingMessage, ServerResponse } from 'http';
import { state, updateState } from '../state/state.js';
import { StatusCodes, StatusMessages } from '../models/constants.js';
import { consoleResponse } from '../utils/consoleResponse.js';
import { isUserIdValid } from '../utils/isUserIdValid.js';
import { isUserExists } from '../utils/isUserExists.js';
import { User } from '../models/user-interface.js';

process.on('message', (newState: User[]) => {
    updateState(newState);
});

export function deleteUser(req: IncomingMessage, res: ServerResponse) {
    const userId = req.url?.split('/api/users/')[1];

    if (!isUserIdValid(res, userId)) {
        return;
    }

    const user = state.find((person) => person.id === userId);

    if (!isUserExists(res, user)) {
        return;
    }

    let userToDelete = 0;
    state.forEach((user, index) => {
        if (user.id === userId) {
            userToDelete = index;
        }
    });
    state.splice(userToDelete, 1);

    if (process.send) {
        process.send(state);
    }

    res.writeHead(StatusCodes.NO_CONTENT, {
        'Content-Type': 'application/json',
    });
    res.end();
    consoleResponse(StatusCodes.NO_CONTENT, StatusMessages.NO_CONTENT);
}
