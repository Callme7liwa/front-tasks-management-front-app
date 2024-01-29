import Images from "../../assets";
import "./Welcome.css";
import { CardTask, SideBare } from "../../Component";
import { SidebarProvider, useSidebarContext } from './../../Hooks/SideBareContext';
import AddTask from "../FormTask/AddTask/AddTask";
import { useEffect, useState } from "react";
import UpdateInfo from "../FormTask/UpdateInfo/UpdateInfo";
import { json, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import UpdateTask from "../FormTask/UpdateTask/UpdateTask";
import { deleteTask, getTasksByUser, updateStatusTask, updateTask } from "../../Actions/task";
import { UPDATE_STATE } from "../../Actions/type";
import ListUsers from "../Users/ListUsers";


const Welcome = () => {
    return (
      <SidebarProvider>
        {/* Other components */}
        <SideBare />
        {/* Access shared state here */}
        <WelcomePageContent />
      </SidebarProvider>
    );
};

const WelcomePageContent = () => {

    const {sidebarState} = useSidebarContext();
    const [manageTask,setManageTask] = useState(false);
    const [manageProfile,setManageProfile] = useState(false);
    const dispatch = useDispatch();
    const [first,setFirst] = useState(false);
    const {user,isLoggedIn} = useSelector(state=>state.auth);
    const {tasks,tasksWorking,tasksPending,tasksCompleted,currentTask,loading,deleteStatus} = useSelector(state=>state.task);
    const [addTask,setAddTask] = useState(false);
    const [seeUsers, setSeeUsers] = useState(false);
    var userStorage = localStorage.getItem('user');

    useEffect(()=>{
      if(!isLoggedIn || !userStorage || !user) {
        navigate("/login");
      }
      if(!first){
        dispatch(getTasksByUser(user?.id));
        setFirst(!first)
      }
    },[])


    function getTasks() {
      if(sidebarState == 0)
        return tasksPending ?? [];
      else if(sidebarState == 1)
        return tasksWorking ?? [];
      else
        return tasksCompleted ?? [];
    }

    const handleUpdateStatus = (e) => {
        dispatch(updateStatusTask(currentTask?.id,e));
    }

    const handleDeleteTask = (e) => {
      dispatch({type : UPDATE_STATE})
      dispatch(deleteTask(currentTask?.id));
      dispatch({type : UPDATE_STATE})
      if(deleteStatus === true)
        setManageTask(false);
    }
    
    const handleUpdateTask = (task) => {
       const id  = task?.id ; 
       const { title, description, estimateStartDate, estimateEndDate } = {...task};
       dispatch(updateTask(id,{ title, description, estimateStartDate, estimateEndDate }));
    }

    return (
      <>
        <div  className="welcome-page-container"> 
              <SideBare />
              <div className="welcome-page_right">
                <div className="page-right_header">
                  <div className="header-avatar-container" onClick={()=>setManageProfile(!manageProfile)}>
                      <div className="image-avatar-container">
                          <img src={Images.icon_avatar} />
                      </div>
                      <span>{user?.firstName} {user?.lastName} </span>
                      <span className="dot dot-green w-5 h-5"></span>
                      <i className="fa fa-chevron-down"></i>
                  </div>
                <div className="line"></div>
                </div>
                <div className="page-right-body">
                    <div className="">
                      <img  src={Images.icon_back}/> 
                      <h3>Welcome back! <span>Stay on top of your tasks.</span> </h3>
                    </div>
                    <div className="welcome-body-add-task">
                      <div onClick={()=>setAddTask(!addTask)} className="add-task-container">
                        <i className="fa fa-plus"></i>
                        <span>Add New Task</span>
                      </div>
                      <div className="pop-up-submit-button bg-white" onClick={()=>setSeeUsers(true)}>
                        <img src={Images.icon_user} alt="Submit Icon" />
                        <span> See All Users </span>
                      </div>
                    </div>
                    <div className="list-tasks">
                      {tasks && getTasks().map((task, index) => (
                          <CardTask  setManageTask={(e)=>setManageTask(e)}  key={index} index={index} task={task} />
                      ))}
                    </div>
                </div>
              </div>
        </div>
        {addTask ? <AddTask addTask={addTask} removeTask={(e)=>setAddTask(false)} /> : <></>}
        {manageTask && <UpdateTask handleUpdateTask={handleUpdateTask} setManageTask={(e) => setManageTask(e)} handleDeleteTask={()=>handleDeleteTask()}  updateStatus={(e)=>handleUpdateStatus(e)} />}
        {manageProfile && <UpdateInfo setManageProfile={(e)=>setManageProfile(!manageProfile)} />}
        {seeUsers && <ListUsers setSeeUsers = {(e)=>setSeeUsers(e)} />}
      </>
       
    );
}

export default Welcome ;