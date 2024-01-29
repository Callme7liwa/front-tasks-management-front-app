import { useState } from "react";
// import { TaskSideBare } from "..";
import { useSidebarContext } from "../../Hooks/SideBareContext";
import Images from "../../assets";
import TaskSideBareContainer from "./TaskContainer/TaskSideBareContainer";
import { useSelector } from "react-redux";

const SideBare = () => {

    const { sidebarState, updateSidebarState } = useSidebarContext();
    const {tasksCompleted,tasksWorking,tasksPending} = useSelector((state)=>state.task);


    
    const typeTasks = [
        {
            taskStatus : "Pending",
            taskIcon   : Images.icon_waiting,
            taskNumber : tasksPending?.length ?? 0
        },
        {
            taskStatus : "Working",
            taskIcon   : Images.icon_working,
            taskNumber : tasksWorking?.length ?? 0
        },
        {
            taskStatus : "Terminated",
            taskIcon   : Images.icon_done,
            taskNumber : tasksCompleted?.length ?? 0
        }
    ]
      

    // const handleStateChange = () => {
    //     // Update the state using the provided function
    //     updateSidebarState(1);
    // };

       
    return (
        <div className="welcome-page_left">
        <div className="welcome-page-left_header">
            <div className="">
                <img className="rotate-infinite" src={Images.logoApp} />
                <span>Tasks Up</span>
            </div>
            <i className="fa fa-bars"></i>
            <div className="line"></div>
        </div>
        <div className="welcome-page-left_body">
            <div className="page-right_title">
               <img src={Images.icon_flash} />
               <span>Manage your tasks</span> 
            </div>
            <div className="page-left_tasks">
                {
                    typeTasks
                    .map((task,index)=>
                            (
                                <TaskSideBareContainer key={index} index={index} currentTask={sidebarState} setType={()=>{updateSidebarState(index)}} task={task}   />
                            )
                        )
                }
            </div>
        </div>
        <div className="list-images-logos">
            <img src={Images.logo_isima} />
            <img src={Images.icon_ensias} />
        </div>
    </div>
    )
}

export default SideBare;