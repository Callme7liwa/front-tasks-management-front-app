import { combineReducers } from "redux";
import auth from "./auth";
import task from "./task";
import user from "./user"


export default combineReducers({
  auth,task,user
});