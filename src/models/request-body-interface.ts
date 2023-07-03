import { User } from './user-interface.js';

export type RequestBody = Omit<User, 'id'>;
