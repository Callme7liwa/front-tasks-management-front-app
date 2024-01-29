import { Tilt } from "react-tilt";
import { motion } from "framer-motion";
import { fadeIn } from "../../utils/motion";
import Images from "../../assets";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { SET_CURRENT_TASK, UPDATE_STATE } from "../../Actions/type";

const CardTask = ({index,task,setManageTask}) => {

    const dispatch = useDispatch();

    const handleClickTask = (task) => {
        dispatch({
            type : SET_CURRENT_TASK,
            payload : task,
        });
        dispatch({
            type : UPDATE_STATE
        })
        setManageTask(true)
    }


    return (
        <>
            <Tilt className='task-container'>
                <motion.div
                variants={fadeIn("right", "spring", index * 0.5, 0.75)}
                className='task-container'
                >
                    <div className="task-number" >
                        <span>{index}</span>
                        <img src={Images.icon_flash} />
                    </div>
                    <div className="task-name">
                        <span>{task?.title}</span>
                    </div>
                    <img src={Images.icon_info} onClick={()=>handleClickTask(task)}/>
                </motion.div>
            </Tilt>
        </>


    );
}

export default CardTask;