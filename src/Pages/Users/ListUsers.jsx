import "./ListUsers"
import { useEffect, useState } from "react";
import Images from "../../assets";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../Actions/user"
import { CardUser } from "../../Component";


const ListUsers = ({setSeeUsers}) => {

    const [first,setFirst] = useState(true);
    const {users} = useSelector((state)=>state.user);
    const dispatch = useDispatch();


    useEffect(()=>{
        if(first)
        {
            dispatch(getAllUsers());
            setFirst(!first);
        }
    },[]);

    return (
        <div className="add-task-pop-up-container">
        <div className="add-task-pop-up-content pop-up-list-users">
          <div className="pop-up-content-header">
            <div className="pop-up-title">
              <img src={Images.icon_flash} alt="Flash Icon" />
              <span> Users who are using the same app !</span>
            </div>
            <div className="close-pop-up" onClick={() => setSeeUsers(false)}>
              <i className="fa fa-remove"></i>
              <span>close</span>
            </div>
          </div>
           <div className="pop-up-content-body pop-up-list-user">
                {
                    users.map(user=>(
                        <CardUser user={user} />
                    ))
                }
           </div>
        </div>
      </div>
    ) 
}

export default ListUsers;