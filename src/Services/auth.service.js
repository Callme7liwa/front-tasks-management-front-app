import instance from "./api";

const END_POINT = "/AUTH-SERVICE/";


const register = (registerReq) =>{

    return instance.post(END_POINT+"register", 
    {
        ...registerReq
    }
    );
};

const login = (authReq) => {
    
    console.log({...authReq})

    return instance.post(END_POINT+"login",
    {
        ...authReq
    }
    );
};


export default {
    register ,
    login,    
}
