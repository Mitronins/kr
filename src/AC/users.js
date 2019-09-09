import { GET_ALL_USERS, SET_AUTH, USERS_TABLE } from '../constans'
import { dataBase } from '../Root'

export const getAllUsers = () => {
  return {
    type: GET_ALL_USERS,
    data: dataBase.queryAll(USERS_TABLE),
  }
}

export const setAuth = (auth) => {
  return {
    type: SET_AUTH,
    data: auth,
  }
}
