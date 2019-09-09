import { SET_AUTH } from '../constans'

const auth = localStorage.getItem('isAuth')
const defaultSingsReducer = {
  auth: auth,
}

export const users = (state = defaultSingsReducer, action) => {
  const { type } = action

  switch (type) {
    case SET_AUTH:
      return {
        ...state,
        auth: action.data,
      }
  }

  return state
}
