# CRUD-API

Clone the repository: [https://github.com/milana1726/CRUD-API](https://github.com/milana1726/CRUD-API.git).  
`git clone https://github.com/milana1726/CRUD-API.git`  

Switch to the branch ***task4-simple-crud-api***   
`git checkout task4-simple-crud-api`

## Install dependencies

Run `npm install` for installing dependencies.

## Start application
Run one of the modes below, then go to https://www.postman.com/ and send requests.   
You can set PORT variable in `.env` file (*by default:* `PORT=4000`).

### 1. Development mode

Run `npm run start:dev` to start the server app in the development mode.   
Server runs on `http://localhost:4000`.  
The application will automatically reload if you change any of the source files.

### 2. Production mode

Run `npm run start:prod` to build bundle and start it in the production mode.  
Server runs on `http://localhost:4000`. 

### 3. Multi-threaded mode

Run `npm run start:multi` to run the app in multi thread mode with load balancer.  
Server runs on `http://localhost:4000`.

## Requests  
***Get all users*** -> *GET* http://localhost:4000/api/users

***Create new user*** -> *POST* http://localhost:4000/api/users + body raw JSON 
```
{
    "username": "User",
    "age": 25,
    "hobbies": ["flowers"]
}
```

***Get user by id*** -> *GET* http://localhost:4000/api/users/${userId} (*you can copy id from the response of the 'create new user' request*)

![image](https://github.com/milana1726/CRUD-API/assets/80005415/fa7420d7-372c-425c-a38d-0dc1e5125a0b)

***Update user*** -> *PUT* http://localhost:4000/api/users/${userId} + body raw JSON 
```
{
    "username": "User Hello",
    "age": 35,
    "hobbies": ["cats", "flowers"]
}
```

***Delete user*** -> *DELETE* http://localhost:4000/api/users/${userId}

## Build

Run `npm run build` to build the project.  
The build files will be stored in the `build/` directory.

## Tests
Run `npm run start:dev` to start the server.  
Then run `npm run test` to execute the tests.
