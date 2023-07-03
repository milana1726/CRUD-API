import { ServerResponse } from 'http';
import { StatusCodes, StatusMessages } from '../models/constants.js';
import { consoleResponse } from '../utils/consoleResponse.js';
import { validate as uuidValidate } from 'uuid';

export const isUserIdValid = (
    res: ServerResponse,
    userId: string | undefined,
) => {
    if (!userId || !uuidValidate(userId)) {
        res.writeHead(StatusCodes.BAD_REQUEST, {
            'Content-Type': 'application/json',
        });

        consoleResponse(StatusCodes.BAD_REQUEST, StatusMessages.BAD_REQUEST);

        res.end(
            JSON.stringify({
                code: StatusCodes.BAD_REQUEST,
                message: StatusMessages.BAD_REQUEST,
            }),
        );
        return false;
    }
    return true;
};
