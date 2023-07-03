import { ServerResponse } from 'http';
import { User } from '../models/user-interface.js';
import { StatusCodes, StatusMessages } from '../models/constants.js';
import { consoleResponse } from './consoleResponse.js';

export const isUserExists = (res: ServerResponse, user: User | undefined) => {
    if (!user) {
        res.writeHead(StatusCodes.NOT_FOUND, {
            'Content-Type': 'application/json',
        });
        consoleResponse(StatusCodes.NOT_FOUND, StatusMessages.NOT_FOUND);
        res.end(
            JSON.stringify({
                code: StatusCodes.NOT_FOUND,
                message: StatusMessages.NOT_FOUND,
            }),
        );
        return false;
    }
    return true;
};
