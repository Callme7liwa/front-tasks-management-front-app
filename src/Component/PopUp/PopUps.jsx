import { useNavigate } from "react-router";
import Images from "../../assets";

export const PopUpResponse = () => {

    const navigate = useNavigate();

    return (
        <div className="add-task-pop-up-container">
        <div className="add-task-pop-up-content ">
          <div className="pop-up-content-header">
            <div className="close-pop-up" onClick={() => removeTask(false)}>
              <i className="fa fa-remove"></i>
              <span>close</span>
            </div>
          </div>
          <div className="pop-up-content-body pop-up-content-body-register ">
            <div className="icon-success">
              <img src={Images.icon_checked} />
            </div>
            <div className="message"> Your Account was created successfuly </div> 
            <div className="button-pop-up" onClick={()=>{navigate('/login')}}>
                <i className="fa fa-long-arrow-right"></i>
                <span>Go to login </span> 
            </div>
          </div>
        </div>
      </div>
    )
   
      
}


export const PopUpErrorsRegister = ({error,closePopUp}) => {

    return (
      <div className="add-task-pop-up-container">
        <div className="add-task-pop-up-content">
          <div className="pop-up-content-header">
            <div className="pop-up-title">
              <img src={Images.icon_flash} alt="Flash Icon" />
              <span> Handle Registring errors</span>
            </div>
            <div className="close-pop-up" onClick={()=>closePopUp(false)} >
              <i className="fa fa-remove"></i>
              <span>close</span>
            </div>
          </div>
          <div className="pop-up-content-body list-erros">
              {error?.email && <span className="error-message"> - {error?.email}</span>}
              {error?.firstName && <span className="error-message"> - {error?.firstName}</span>}
              {error?.lastName && <span className="error-message"> - {error?.lastName}</span>}
              {error?.password && <span className="error-message"> - {error?.password}</span>}
              {error?.confirmPassword && <span className="error-message"> {error?.confirmPassword}</span>}
           
          </div>
        </div>
      </div>  
    )
       
  }