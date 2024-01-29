import instance, { headersDefaultValues } from "./api";

const END_POINT = "/TASK-SERVICE/";

const accessToken = localStorage.getItem("accessToken");

const config = {
    headers: {
      ...headersDefaultValues,
      "Authorization": "Bearer " + accessToken
    }
  };

const addTask = (task) => {
    return instance.post(END_POINT,{...task},config);
}

const updateTask = (id,task) => {
    return instance.put(END_POINT+id,{...task},config);
}

const getTasks = (id) => {
    console.log({...headersDefaultValues , "Authorization" : "Bearer "+accessToken})
    return instance.get(END_POINT+"user/"+id,config);
}

const deleteStatus = (id) => {
    return instance.delete(END_POINT+"deleteStatus/"+id , config)
}

const updateStatus = (id) => {
    return instance.put(END_POINT+"updateStatus/"+id , {} , config);
}

export default  {
    getTasks,
    deleteStatus,
    updateStatus,
    addTask,
    updateTask
}