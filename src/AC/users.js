import { GET_ALL_USERS, SIGN_UP_USER, SINGS_TABLE, USERS_TABLE } from '../constans'
import dataBase from '../Root'

export const getAllUsers = () => {
  return {
      type: GET_ALL_USERS,
      data: dataBase.queryAll(SINGS_TABLE),
  }
};

export const signUpUser = (user) => {
    const newUserId = dataBase.insert(USERS_TABLE, {
        name: user.name,
        pass: user.pass,
    });
    dataBase.commit();

    return {
        type: SIGN_UP_USER,
        data: {
            id: newUserId,
            ...user,
        },
    }
};

export const loginUser = (user) => {
    const newUserId = dataBase.insert(USERS_TABLE, {
        name: user.name,
        pass: user.pass,
    });
    dataBase.commit();

    return {
        type: SIGN_UP_USER,
        data: {
            id: newUserId,
            ...user,
        },
    }
};
