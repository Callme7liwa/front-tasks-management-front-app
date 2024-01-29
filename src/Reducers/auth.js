import { FINISH_LOADING, LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT, REGISTER_FAIL, REGISTER_LOADING, REGISTER_SUCCESS, UPDATE_STATE } from "../Actions/type";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = 
    {
        loading : false,
        IsRegisteredSucess: false,
        IsRegisteredFailed: false,
        isLoggedIn : user ? true : false , 
        user : user? user : null ,
    }

export default function (state=initialState , action) {


    const {type,payload} = action ; 

    switch(type)
    {

        case FINISH_LOADING   : 
            return {
                ...state,
                loading : false,
            }
        case REGISTER_LOADING : 
            return {
                ...state,
                loading : true,
            }
        case REGISTER_SUCCESS :
            return {
                ...state,
                IsRegisteredSucess:true,
                IsRegisteredFailed:false,
            }
        case REGISTER_FAIL : 
            return {
                ...state,
                IsRegisteredSucess:false,
                IsRegisteredFailed:true,
            }
        case LOGIN_SUCCESS :
            return {
                ...state,
                isLoggedIn:true,
                loading : false,
                user:payload
            }
        case LOGIN_FAIL :
            return {
                isLoggedIn:false,
                loading : false,
                user:null
            }
        case LOGOUT : 
            return {
                isLoggedIn:false,
                loading : false,
                user:null 
            }
        case UPDATE_STATE : 
            return {
                ...state
            }
        default :
            return state  ; 
    }
}