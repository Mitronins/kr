import {ADD_NEW_SING, GET_ALL_SINGS, EDIT_SING, DELETE_SING} from "../constans";

const defaultSingsReducer = {
    sings: [],
};

export const sings = (state = defaultSingsReducer, action) => {
    const {type} = action;

    switch (type) {
        case GET_ALL_SINGS:
            return {
                ...state,
                sings: action.data,
            };
        case ADD_NEW_SING:
            return {
                ...state,
                sings: [ ...state.sings, action.data ]
            };
        case EDIT_SING:
            const newSings = state.sings.map((sing) => {
                if (sing.ID === action.data.ID) {
                    return action.data
                }
                return sing
            });
            return {
                ...state,
                sings: newSings,
            };
        case DELETE_SING:
            return {
                ...state,
                sings: state.sings.filter((sing) => sing.ID !== action.data)
            }
    }

    return state;
};