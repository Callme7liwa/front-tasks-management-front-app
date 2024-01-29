import { useDispatch, useSelector } from "react-redux";
import { InputField } from "../../../Component";
import Images from "../../../assets";
import { logout } from "../../../Actions/auth";

const UpdateInfo = ({setManageProfile}) => {
  
    const {user} = useSelector(state=>state?.auth);
    const dispatch = useDispatch();

    const handleLogout = () => {
      localStorage.removeItem('user');
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      dispatch(logout());
      window.location.href = '/login';
    }

    return (
    <div className="add-task-pop-up-container">
      <div className="add-task-pop-up-content">
        <div className="pop-up-content-header">
          <div className="pop-up-title">
            <img src={Images.icon_flash} alt="Flash Icon" />
            <span> Update and review your information.</span>
          </div>
          <div className="close-pop-up" onClick={() => setManageProfile(false)}>
            <i className="fa fa-remove"></i>
            <span>close</span>
          </div>
        </div>
        <div className="pop-up-content-body pop-up-profile">
            <div className="image-avatar-container">
                <img src={Images.icon_avatar} />
            </div>
            <InputField label="First Name" icon={Images.icon_name} type="text" name="firstName" value={user.firstName}  placeholder="First Name ..." disabled/>
            <InputField label="Second Name" icon={Images.icon_secondName} type="text" name="lastName" value={user.lastName}    placeholder="Second Name ..." disabled/>
            <InputField label="Email" icon={Images.icon_gmail} type="email" name="email" value={user.email}   placeholder="email ..." />
            <div className="pop-up-submit-button bg-dark" onClick={()=>handleLogout()}>
                <img src={Images.icon_deconnecter} alt="Submit Icon" />
                <span> Deconnecter  </span>
            </div>
        </div>
      </div>
    </div>
    )
}

export default UpdateInfo;