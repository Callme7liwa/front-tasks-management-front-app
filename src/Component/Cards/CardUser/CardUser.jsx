import Images from "../../../assets";
import "./CardUser.css";

const CardUser = ({user}) => {
    return (
        <div className="card-user">
            <div className="image-container">
                <img src={Images.icon_avatar} />
            </div>
            <div className="info-user"> 
                <img src={Images.icon_name} />
                <span> {user.firstName} {user.lastName} </span>
            </div>
            <div className="info-user email"> 
                <img src={Images.icon_gmail} />
                <span> {user.email} </span>
            </div>
        </div>
    )
}

export default CardUser;