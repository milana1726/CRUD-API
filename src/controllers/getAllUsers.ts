import { IncomingMessage, ServerResponse } from 'http';
import { state } from '../state/state.js';
import { StatusCodes, StatusMessages } from '../models/constants.js';
import { consoleResponse } from '../utils/consoleResponse.js';

export const getAllUsers = (req: IncomingMessage, res: ServerResponse) => {
    res.writeHead(StatusCodes.OK, {
        'Content-Type': 'application/json',
    });
    res.end(JSON.stringify(state));
    consoleResponse(StatusCodes.OK, StatusMessages.OK);
};
