import supertest from 'supertest';
import { StatusCodes, StatusMessages } from '../models/constants.js';
import { User } from '../models/user-interface.js';
import { validate } from 'uuid';

const serverUrl = 'http://localhost:4000';
const apiUrl = '/api/users';

const testUser = {
    username: 'Mila',
    age: 26,
    hobbies: ['flowers', 'cats'],
};
const testUserWithId = { ...testUser, ...{ id: '' } };

const arrayOfUsers: User[] = [];

const notUuidUserID = 'this is user id #123';
const testUserId = '5c671dfa-bacf-415e-9a1a-7ff4191c7ec3';
const incorrectRequestBody = [
    {
        username: 'User',
    },
    {
        username: 'User',
        hobbies: ['hobby'],
    },
    {
        username: 'User',
        age: '50',
        hobbies: ['hobby'],
    },
    {},
    {
        key: 'value',
    },
];
const incorrectServerUrl = '/api/incorrect/';

describe('Scenario 1 - Operations with correct data', () => {
    it('should get an empty array of users, GET request', async () => {
        const response = await supertest(serverUrl).get(apiUrl);
        expect(response.statusCode).toEqual(StatusCodes.OK);
        expect(response.body).toEqual(arrayOfUsers);
    });

    it('should get a new created user, POST request', async () => {
        const response = await supertest(serverUrl).post(apiUrl).send(testUser);
        testUserWithId.id = response.body.id;
        expect(response.statusCode).toEqual(StatusCodes.CREATED);
        expect(response.body).toEqual(testUserWithId);
    });

    it('should get user by id, GET request by id', async () => {
        console.log(testUserWithId.id);
        const response = await supertest(serverUrl).get(
            apiUrl + '/' + testUserWithId.id,
        );
        expect(response.statusCode).toEqual(StatusCodes.OK);
        expect(response.body).toEqual(testUserWithId);
    });

    it('should get updated user by id, PUT request by id', async () => {
        const testUserUpdated = {
            username: 'Margo',
            age: 8,
            hobbies: ['cats'],
        };
        const fakeUserWithIdUpdated = {
            ...testUserUpdated,
            ...{ id: testUserWithId.id },
        };
        const response = await supertest(serverUrl)
            .put(apiUrl + '/' + testUserWithId.id)
            .send(testUserUpdated);
        expect(response.statusCode).toEqual(StatusCodes.OK);
        expect(response.body).toEqual(fakeUserWithIdUpdated);
    });

    it('should get a confirmation of successful deletion of user, DELETE request', async () => {
        const response = await supertest(serverUrl).delete(
            apiUrl + '/' + testUserWithId.id,
        );
        expect(response.statusCode).toEqual(StatusCodes.NO_CONTENT);
    });
});

describe('Scenario 1 - Operations with invalid user data', () => {
    it('should get error status code 400 and message if userId is invalid (not uuid), GET request by id', async () => {
        if (!validate(notUuidUserID)) {
            const response = await supertest(serverUrl).get(
                apiUrl + '/' + notUuidUserID,
            );
            expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST);
            expect(response.body.message).toEqual(StatusMessages.BAD_REQUEST);
        }
    });

    it.each(incorrectRequestBody)(
        'should get error status code 400 and message if request body is invalid, POST request',
        async (body) => {
            const response = await supertest(serverUrl).post(apiUrl).send(body);
            expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST);
            expect(response.body.message).toEqual(StatusMessages.BAD_REQUEST);
        },
    );

    it('should get error status code 400 and message if userId is invalid (not uuid), PUT request by id', async () => {
        if (!validate(notUuidUserID)) {
            const response = await supertest(serverUrl)
                .put(apiUrl + '/' + notUuidUserID)
                .send(testUser);
            expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST);
            expect(response.body.message).toEqual(StatusMessages.BAD_REQUEST);
        }
    });

    it('should get error status code 400 and message if userId is invalid (not uuid), DELETE request by id', async () => {
        if (!validate(notUuidUserID)) {
            const response = await supertest(serverUrl).delete(
                apiUrl + '/' + notUuidUserID,
            );
            expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST);
            expect(response.body.message).toEqual(StatusMessages.BAD_REQUEST);
        }
    });
});

describe('Scenario 3 - Operations with non-exist user and non-existing endpoints', () => {
    it('should get error status code 404 and message if user with id === userId doesnt exist, GET request by id', async () => {
        const response = await supertest(serverUrl).get(
            apiUrl + '/' + testUserId,
        );
        expect(response.statusCode).toEqual(StatusCodes.NOT_FOUND);
        expect(response.body.message).toEqual(StatusMessages.NOT_FOUND);
    });

    it('should get error status code 404 and message if user with id === userId doesnt exist, PUT request by id', async () => {
        const response = await supertest(serverUrl)
            .put(apiUrl + '/' + testUserId)
            .send(testUser);
        expect(response.statusCode).toEqual(StatusCodes.NOT_FOUND);
        expect(response.body.message).toEqual(StatusMessages.NOT_FOUND);
    });

    it('should get error status code 404 and message if user with id === userId doesnt exist, DELETE request by id', async () => {
        const response = await supertest(serverUrl).delete(
            apiUrl + '/' + testUserId,
        );
        expect(response.statusCode).toEqual(StatusCodes.NOT_FOUND);
        expect(response.body.message).toEqual(StatusMessages.NOT_FOUND);
    });

    it('should error status code 404 and message if request to non-existing endpoints, GET request', async () => {
        const response = await supertest(serverUrl).get(incorrectServerUrl);
        expect(response.statusCode).toEqual(StatusCodes.NOT_FOUND);
        expect(response.body.message).toEqual(StatusMessages.NOT_FOUND);
    });
});
