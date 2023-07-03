import { IncomingMessage, ServerResponse } from 'http';
import { StatusCodes, StatusMessages } from '../models/constants.js';
import { consoleResponse } from './consoleResponse.js';
import { RequestBody } from '../models/request-body-interface.js';

const checkTypeOfHobbies = (arrayOfHobbies: string[] | []) => {
    if (arrayOfHobbies.length) {
        for (const hobby of arrayOfHobbies) {
            if (typeof hobby !== 'string') return false;
        }
        return true;
    }
};

export const isBodyValid = (
    res: ServerResponse<IncomingMessage>,
    userData: RequestBody,
) => {
    try {
        if (!userData) return false;
        return (
            Object.keys(userData).length === 3 &&
            'age' in userData &&
            typeof userData.age === 'number' &&
            'hobbies' in userData &&
            Array.isArray(userData.hobbies) &&
            checkTypeOfHobbies(userData.hobbies) &&
            'username' in userData &&
            typeof userData.username === 'string' &&
            userData
        );
    } catch (err) {
        console.log('Something went wrong...');
        console.error(err);
        consoleResponse(
            StatusCodes.INTERNAL_SERVER_ERROR,
            StatusMessages.INTERNAL_SERVER_ERROR,
        );
    }
};
