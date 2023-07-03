import { state } from '../state/state.js';
import { IncomingMessage, ServerResponse } from 'http';
import { StatusCodes, StatusMessages } from '../models/constants.js';
import { consoleResponse } from '../utils/consoleResponse.js';

export function getUser(req: IncomingMessage, res: ServerResponse) {
    const userId = req.url?.split('/api/users/')[1];

    const user = state.find((user) => user.id === userId);

    if (!user) {
        res.writeHead(StatusCodes.NOT_FOUND, {
            'Content-Type': 'application/json',
        });
        consoleResponse(StatusCodes.NOT_FOUND, StatusMessages.NOT_FOUND);
        return res.end(
            JSON.stringify({
                code: StatusCodes.NOT_FOUND,
                message: StatusMessages.NOT_FOUND,
            }),
        );
    }

    res.writeHead(StatusCodes.OK, {
        'Content-Type': 'application/json',
    });
    res.end(JSON.stringify(user));
    consoleResponse(StatusCodes.OK, StatusMessages.OK);
}
