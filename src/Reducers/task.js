import {  ADD_TASK, END_UPDATE_TASK, ERROR_DELETE_TASK, FINISH_LOADING, FINISH_TASK, LOADING, MOVE_TASK_TO_TERMINATE, MOVE_TASK_TO_WORKING, SET_CURRENT_TASK, SET_TASKS_USER, START_TASK, START_UPDATE_TASK, SUCCESS_DELETE_TASK, SUCCESS_UPDATE_TASK, UPDATE_STATE, UPDATE_TASK } from "../Actions/type";

const initialState = {
    loading : false,
    tasks : [],
    tasksCompleted : [],
    tasksWorking : [],
    tasksPending : [],
    currentTask:{
        id : undefined,
        title : "",
        description : "",
        status : "",
        estimateStartDate:"",
        estimateEndDate:""
    },
    deleteStatus:false,
    finishTask : false,
    loadingUpdate : false,
}

export default function (state=initialState, action){
    const {type,payload} = action;

    switch(type)
    {
        case START_TASK : 
        return {
            ...state,
            deleteStatus:false,
            finishTask : false
        }
        case FINISH_TASK : 
        return {
            ...state,
            finishTask : true
        }
        case FINISH_LOADING : 
        return {
            ...state,
            loading : false,
        }
        case LOADING : 
        return {
            ...state,
            loading : true,
        }
        case SET_CURRENT_TASK : 
            return {
                ...state,
                currentTask : payload
        }
        case ADD_TASK  : {
            console.log("the payloed " , payload);
            return {
                ...state,
                tasks : [...state.tasks,payload],
                tasksPending : [...state.tasksPending,payload]
            }
        }
        case START_UPDATE_TASK : {
            return {
                ...state,
                loadingUpdate : true
            }
        }
        case UPDATE_TASK: {
            const taskUpdated = payload;
            const updatedTasksWorking = state.tasksWorking.map(task => {
              if (task.id === taskUpdated?.id) {
                return {
                  ...task,
                  title: taskUpdated?.title,
                  description: taskUpdated?.description,
                  status: taskUpdated?.status,
                  estimateStartDate : taskUpdated?.estimateStartDate,
                  estimateEndDate : taskUpdated?.estimateEndDate,
                };
              }
              return task;
            });
          
            const updatedTasksPending = state.tasksPending.map(task => {
              if (task.id === taskUpdated?.id) {
                return {
                  ...task,
                  title: taskUpdated?.title,
                  description: taskUpdated?.description,
                  status: taskUpdated?.status,
                  estimateStartDate : taskUpdated?.estimateStartDate,
                  estimateEndDate : taskUpdated?.estimateEndDate,
                };
              }
              return task;
            });
          
            const updatedTasksCompleted = state.tasksCompleted.map(task => {
              if (task.id === taskUpdated?.id) {
                return {
                  ...task,
                  title: taskUpdated?.title,
                  description: taskUpdated?.description,
                  status: taskUpdated?.status,
                  estimateStartDate : taskUpdated?.estimateStartDate,
                  estimateEndDate : taskUpdated?.estimateEndDate,
                };
              }
              return task;
            });
          
            return {
              ...state,
              tasksWorking: updatedTasksWorking,
              tasksPending: updatedTasksPending,
              tasksCompleted: updatedTasksCompleted,
              currentTask: {
                ...state.currentTask,
                id: taskUpdated?.id,
                title: taskUpdated?.title,
                description: taskUpdated?.description,
                status: taskUpdated?.status,
                estimateStartDate : taskUpdated?.estimateStartDate,
                estimateEndDate : taskUpdated?.estimateEndDate,
              },
            };
          }
        case END_UPDATE_TASK : {
            return {
                ...state,
                loadingUpdate : false,
            }
        }
        case MOVE_TASK_TO_WORKING:
            if (state.tasksPending?.filter(task => task.id === payload).length > 0) {
                var taskToMove = state.tasksPending.filter(task => task.id === payload)[0];
                taskToMove.status = 1;
                return {
                ...state,
                tasksPending: state.tasksPending.filter(task => task.id !== payload),
                tasksWorking: [taskToMove, ...state.tasksWorking],
                currentTask:taskToMove,
                };
            } else {
                return state;
            }
        case MOVE_TASK_TO_TERMINATE : 
            if (state.tasksWorking?.filter(task => task.id === payload).length > 0) {
                var taskToMove = state.tasksWorking.filter(task => task.id === payload)[0];
                taskToMove.status = 2;
                return {
                ...state,
                tasksWorking: state.tasksWorking.filter(task => task.id !== payload),
                tasksCompleted: [taskToMove, ...state.tasksCompleted],
                currentTask:taskToMove,
                };
            } else {
                return state;
            }
        case SET_TASKS_USER : 
            return {
                ...state,
                tasks : payload,
                tasksCompleted : payload.filter(myTask=>myTask.status == 2),
                tasksWorking : payload.filter(myTask=>myTask.status == 1),
                tasksPending : payload.filter(myTask=>myTask.status == 0),
            }
        case SUCCESS_UPDATE_TASK : 
            return {
                ...state,
            }
        case SUCCESS_DELETE_TASK :
            return {
                ...state,
                deleteStatus : true,
                finishTask : true,
                tasksWorking : state.tasksWorking.filter(myTask=>myTask.id !== payload),
                tasksPending : state.tasksPending.filter(myTask=>myTask.id !== payload),
                tasksCompleted : state.tasksCompleted.filter(myTask=>myTask.id !== payload),
            }
        case ERROR_DELETE_TASK :
            return {
                ...state,
                deleteStatus : false,
                finishTask : true,
            }
        case UPDATE_STATE : 
            return {
                ...state
            }
        // case UPDATE_STATUS_TASK : 
        //     return {
        //         ...state,
        //         // tasks : tasks.filter(task => task?.id == payload.id ? task?.status = payload?.status : task),
        //     }
        default : return {
            ...state
        }
    }
}