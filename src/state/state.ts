/* eslint-disable prefer-const */
import { User } from '../models/user-interface';

export let state: User[] = [];

export const updateState = (newState: User[]) => {
    state = newState;
};

