import { useState } from 'react';
import Images from '../../../assets';
import { InputField } from '../../../Component';
import "./UpdateTask.css";
import { useSelector } from 'react-redux';

const UpdateTask = ({setManageTask,updateStatus,handleDeleteTask,handleUpdateTask}) => {

  const {loadingUpdate,currentTask} = useSelector(state=>state.task);
  const [updatedTask , setUpdatedTask] = useState({...currentTask});
  const [error,setError] = useState({
    title : "",
    estimateStartDate : "",
    estimateEndDate : "",
    description : ""
  });

  const ButtonPopUp = ({ icon, name, handleClick, ...props }) => {
    return (
      <div {...props} onClick={()=>handleClick()}>
        <img src={icon} alt="Submit Icon" />
        <span>{name}</span>
      </div>
    );
  };

  const handleChangeInput = (e) => {
    setUpdatedTask({
      ...updatedTask,
      [e.target.name] : e.target.value
    })
  }

  const handleUpdate = () => {
    // Validate the task title
    let valid = true ; 
    if (!updatedTask.title || updatedTask.title.trim().length < 3) {
      setError((prevError) => ({
        ...prevError,
        title: "Le titre doit contenir au moins 3 caractères.",
      }));
      valid = false;
    } else {
      setError((prevError) => ({ ...prevError, title: "" }));
    }
  
    // Validate the estimated start date
    if (!updatedTask.estimateStartDate) {
      setError((prevError) => ({
        ...prevError,
        estimateStartDate: "Veuillez entrer une date de début estimée.",
      }));
      valid = false;
    } else {
      setError((prevError) => ({ ...prevError, estimateStartDate: "" }));
    }
  
    // Validate the estimated end date
    if (!updatedTask.estimateEndDate) {
      setError((prevError) => ({
        ...prevError,
        estimateEndDate: "Veuillez entrer une date de fin estimée.",
      }));
      valid = false;
    } else {
      setError((prevError) => ({ ...prevError, estimateEndDate: "" }));
    }

    const startDate = new Date(updatedTask.estimateStartDate);
    const endDate = new Date(updatedTask.estimateEndDate);
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
    if (!updatedTask.description) {
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
      
      handleUpdateTask(updatedTask);
  
      // Clear the error state
      setError({
        title: "",
        estimateStartDate: "",
        estimateEndDate: "",
        description: "",
      });
    }
  };


  return (
    <div className="add-task-pop-up-container">
      <div className="add-task-pop-up-content">
        <div className="pop-up-content-header">
          <div className="pop-up-title">
            <img src={Images.icon_flash} alt="Flash Icon" />
            <span> These are complete information about the task</span>
          </div>
          <div className="close-pop-up" onClick={() => setManageTask(false)}>
            <i className="fa fa-remove"></i>
            <span>close</span>
          </div>
        </div>
        <div className="pop-up-content-body">
          <InputField 
            label="Task Name"            
            icon={Images.icon_task}        
            type="text"        
            value={updatedTask?.title}             
            name="title"        
            setValue={(e)=>handleChangeInput(e)} 
            placeholder="Task Name ..." 
            error = {error?.title}
          />
          <InputField 
            label="Estimated Start Date" 
            icon={Images.icon_start}       
            type="datetime-local"      
            value={updatedTask?.estimateStartDate}        
            name="estimateStartDate"       
            setValue={(e)=>handleChangeInput(e)} 
            placeholder="Task Start Date ..." 
            pattern="\d{4}-\d{2}-\d{2}" 
            error = {error?.estimateStartDate}
          />
          <InputField 
            label="Estimated End Date"   
            icon={Images.icon_end}         
            type="datetime-local"         
            value={updatedTask?.estimateEndDate} 
            name="estimateEndDate"         
            setValue={(e)=>handleChangeInput(e)} 
            placeholder="Task End Date ..."   
            pattern="\d{4}-\d{2}-\d{2}"
            error = {error?.estimateEndDate} 
          />
          <InputField 
            label="Task Description"     
            icon={Images.icon_description} 
            type="text" 
            value={updatedTask?.description}      
            name="description" 
            setValue={(e)=>handleChangeInput(e)} 
            placeholder="Task Description ..." 
            textarea="true"
            error = {error?.description} 
          />
          <div className='list-pop-up-buttons'>
            <div>
              <ButtonPopUp name={loadingUpdate == true ? "loading" : "Update"} icon={Images.icon_submit} className="pop-up-submit-button" handleClick={()=>handleUpdate()} />
              {
                currentTask?.status == 0 ? 
                (
                  <ButtonPopUp name="Start" icon={Images.icon_start} className="pop-up-submit-button start" handleClick={()=>updateStatus("Working")} />
                )
                : currentTask?.status == 1 ?
                (
                  <ButtonPopUp name="Terminate" icon={Images.icon_terminated} className="pop-up-submit-button terminate" handleClick={()=>updateStatus("Completed")} />
                ) : (<></>)
              }
            </div>
            <ButtonPopUp name="delete" icon={Images.icon_delete} className="pop-up-submit-button delete" handleClick={()=>handleDeleteTask()} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateTask;
