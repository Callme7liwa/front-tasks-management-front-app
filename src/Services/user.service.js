import instance ,{headersDefaultValues} from "./api";

const END_POINT = "/USER-SERVICE";

const accessToken = localStorage.getItem("accessToken");


const getAllUsers = () => {
    return instance.get(END_POINT,{headers:{...headersDefaultValues , "Authorization" : "Bearer "+accessToken}});
}

export default {
    getAllUsers,
}