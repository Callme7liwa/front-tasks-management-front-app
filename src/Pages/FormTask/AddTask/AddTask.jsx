import './AddTask.css';
import Images from '../../../assets';
import { InputField } from '../../../Component';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTaskReq } from '../../../Actions/task';

const AddTask = ({ addTask, removeTask }) => {

  const {user} = useSelector((state)=>state.auth);
  const dispatch = useDispatch();

  const [newTask , setNewTask] = useState({
    title : "",
    estimateStartDate : "",
    estimateEndDate : "",
    description :"",
  });
  const [error,setError] = useState({
    title : "",
    estimateStartDate : "",
    estimateEndDate : "",
    description : ""
  });


  const sendAddTaskReq = () => {
    const addTaskAttributs = {
      ...newTask,
      userId : user?.id,
    }
    dispatch(addTaskReq(addTaskAttributs));
  }

  const handleAddTask = () => {
    // Validate the task title
    let valid = true ; 
    if (!newTask.title || newTask.title.trim().length < 3) {
      setError((prevError) => ({
        ...prevError,
        title: "Le titre doit contenir au moins 3 caractères.",
      }));
      valid = false;
    } else {
      setError((prevError) => ({ ...prevError, title: "" }));
    }
  
    // Validate the estimated start date
    if (!newTask.estimateStartDate) {
      setError((prevError) => ({
        ...prevError,
        estimateStartDate: "Veuillez entrer une date de début estimée.",
      }));
      valid = false;
    } else {
      setError((prevError) => ({ ...prevError, estimateStartDate: "" }));
    }
  
    // Validate the estimated end date
    if (!newTask.estimateEndDate) {
      setError((prevError) => ({
        ...prevError,
        estimateEndDate: "Veuillez entrer une date de fin estimée.",
      }));
      valid = false;
    } else {
      setError((prevError) => ({ ...prevError, estimateEndDate: "" }));
    }

    const startDate = new Date(newTask.estimateStartDate);
    const endDate = new Date(newTask.estimateEndDate);
    if (startDate && endDate && endDate <= startDate) {
      setError((prevError) => ({
        ...prevError,
        estimateEndDate: "La date de fin doit être postérieure à la date de début.",
      }));
      valid = false
    } else {
      setError((prevError) => ({ ...prevError, estimateEndDate: "" }));
    }
  
    // Validate the task description
    if (!newTask.description) {
      setError((prevError) => ({
        ...prevError,
        description: "Veuillez entrer une description de la tâche.",
      }));
      valid = false;
    } else {
      setError((prevError) => ({ ...prevError, description: "" }));
    }
  
    // Update the task if all fields are valid
    if (
      valid == true
    ) {
      // Send the updated task data to the server
      
      sendAddTaskReq();
  
      // Clear the error state
      setError({
        title: "",
        estimateStartDate: "",
        estimateEndDate: "",
        description: "",
      });
    }
  };





  const handleUpdateField = (e) => {
    setNewTask((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <div className="add-task-pop-up-container">
      <div className="add-task-pop-up-content ">
        <div className="pop-up-content-header">
          <div className="pop-up-title">
            <img src={Images.icon_flash} alt="Flash Icon" />
            <span> These are complete information about the task</span>
          </div>
          <div className="close-pop-up" onClick={() => removeTask(false)}>
            <i className="fa fa-remove"></i>
            <span>close</span>
          </div>
        </div>
        <form className="pop-up-content-body ">
          <InputField
            // error={taskName.error}
            value={newTask?.title}
            setValue={(e) =>
              handleUpdateField(e)
            }
            label="Task Name"
            icon={Images.icon_task}
            type="text"
            name="title"
            placeholder="Task Name ..."
            error={error?.title}
          />

          <InputField
            // error={startedDate.error}
            value={newTask.estimateStartDate}
            setValue={(e) =>
              handleUpdateField(e)
            }
            label="Estimated Start Date"
            icon={Images.icon_start}
            type="datetime-local"
            name="estimateStartDate"
            placeholder="Task Start Date ..."
            error={error?.estimateStartDate}
          />

          <InputField
            //error={endDate.error}
            value={newTask.estimateEndDate}
            setValue={(e) =>
              handleUpdateField(e)
            }
            label="Estimated End Date"
            icon={Images.icon_end}
            type="datetime-local"
            name="estimateEndDate"
            placeholder="Task End Date ..."
            error={error?.estimateEndDate}
          />

          <InputField
            // error={taskDescription.error}
            value={newTask.description}
            setValue={(e) =>
              handleUpdateField(e)
            }
            label="Task Description"
            icon={Images.icon_description}
            type="text"
            name="description"
            placeholder="Task Description ..."
            error={error?.description}
          />
          <div className="pop-up-submit-button" onClick={()=>handleAddTask()}>
            <img src={Images.icon_submit} alt="Submit Icon" />
            <span> Submit </span>
          </div>
        </form>
      </div>
    </div>
  );
};



export default AddTask;
