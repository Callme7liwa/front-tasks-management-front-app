import { SET_ALL_USERS, UPDATE_STATE } from "../Actions/type";

const initialState = {
    users : [],
}

export default function (state=initialState,action) {

    const {type,payload} = action ; 

    switch(type) {
        case SET_ALL_USERS : 
            return {
                ...state,
                users : payload
            }
        case UPDATE_STATE : {
            return {
                ...state
            }
        }
        default : return {
            ...state
        }
    }
}