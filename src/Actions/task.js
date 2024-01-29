import taskService from "../Services/task.service";
import { ADD_TASK, END_UPDATE_TASK, FINISH_LOADING, FINISH_TASK, LOADING, MOVE_TASK_TO_TERMINATE, MOVE_TASK_TO_WORKING, SET_TASKS_USER, START_TASK, START_UPDATE_TASK, SUCCESS_DELETE_TASK, SUCCESS_UPDATE_TASK, UPDATE_STATE, UPDATE_TASK } from "./type";


export const addTaskReq = (task) => (dispatch) => {

    return taskService
        .addTask(task)
        .then((response)=>{             
            dispatch({
                type : ADD_TASK,
                payload : response.data
            });
            dispatch({
                type : UPDATE_STATE
            });
        }).catch((error)=>{
            console.log("error while adding a task",error);
        });
}



export const updateTask = (id,task) => (dispatch) => {

    dispatch({
        type : START_UPDATE_TASK,
    })

    return taskService
            .updateTask(id,task)
            .then((response)=>{
                dispatch({
                    type : UPDATE_TASK,
                    payload : response.data,
                })
            }).catch((error)=>{
                console.log("errors =>",error);
            }).finally(()=>{
                dispatch({
                    type : END_UPDATE_TASK,
                })            
            })
}

export const getTasksByUser = (id) => async(dispatch)  => {
    return taskService
            .getTasks(id)
            .then((response)=>{
                dispatch({
                    type:SET_TASKS_USER,
                    payload : response.data
                });
                dispatch({
                    type:UPDATE_STATE
                })
            });
}

export const deleteTask = (id) => async (dispatch) => {
   
    dispatch({ type: START_TASK})
    dispatch({ type: LOADING });
    dispatch({ type: UPDATE_STATE });

    return taskService
            .deleteStatus(id)
            .then((response)=>{
                dispatch({
                    type:SUCCESS_DELETE_TASK,
                    payload : id
                });
                dispatch({ type: FINISH_LOADING });
                dispatch({ type: FINISH_TASK})
                dispatch({ type: UPDATE_STATE });
            })
            .catch((error)=>{
                console.log("error while deleting",error);
            });
};

export const updateStatusTask = (id,status) => async(dispatch)=>{

    return taskService
            .updateStatus(id)
            .then((response)=>{
                console.log("success update response",response);
                dispatch({
                    type : SUCCESS_UPDATE_TASK
                });
                if(status == "Working") 
                    dispatch({
                        type : MOVE_TASK_TO_WORKING,
                        payload : id
                    })
                else
                    dispatch({
                        type : MOVE_TASK_TO_TERMINATE,
                        payload : id
                    })
                dispatch({
                    type : UPDATE_STATE
                })
            }).catch((error)=>{
                console.log("Error while updating the status",error);
            })
}   

