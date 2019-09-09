import {combineReducers} from 'redux';

import { music } from './music';
import { users } from './users';

export const reducer = combineReducers({
    sings: music,
    users,
});
