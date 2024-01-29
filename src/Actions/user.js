import userService from "../Services/user.service"
import { SET_ALL_USERS } from "./type"


export const getAllUsers = () => (dispatch) => {
    return userService
            .getAllUsers()
            .then((response)=>{
                console.log(response);
                dispatch({
                    type : SET_ALL_USERS,
                    payload : response.data
                })
            }).catch((error)=>{
                console.log("the error", error);
            })
}