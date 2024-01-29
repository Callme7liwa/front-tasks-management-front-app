import axios from "axios";

const instance = axios.create({
  baseURL: " https://localhost:7029/",
});

export const headersDefaultValues  = {
   
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": '*',
    "X-Requested-With":"XMLHttpRequest",
    
}

export default instance ; 