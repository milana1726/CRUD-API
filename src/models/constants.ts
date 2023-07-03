export const DEFAULT_PORT = 4000;

export const enum StatusCodes {
    OK = 200,
    CREATED = 201,
    NO_CONTENT = 204,
    BAD_REQUEST = 400,
    NOT_FOUND = 404,
    INTERNAL_SERVER_ERROR = 500,
}

export const enum StatusMessages {
    OK = 'The request succeeded. OK',
    CREATED = 'The request succeeded. User created',
    NO_CONTENT = 'There is no content. User deleted',
    BAD_REQUEST = 'Bad Request. Body parameters are invalid',
    NOT_FOUND = 'Not Found',
    INTERNAL_SERVER_ERROR = 'Internal Server Error',
}
