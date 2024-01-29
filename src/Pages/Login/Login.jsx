import { useEffect, useState } from "react";
import BallCanvas from "../../Component/Canvas/Ball";
import Images from "../../assets";
import "./Login.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { login } from "../../Actions/auth";
import {useNavigate} from "react-router-dom";
import validation from "../../utils/validation";
import { UPDATE_STATE } from "../../Actions/type";

const Login = () => {
  

    var userStorage = localStorage.getItem('user');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {user,isLoggedIn} = useSelector(state=>state.auth);
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [error, setError] = useState({
      email: "",
      password: "",
    });

    useEffect(()=>{
      if(userStorage || isLoggedIn || user)
        navigate('/welcome');

      console.log("ahaha")
    },[userStorage]);

    useEffect(()=>{
      if(userStorage || isLoggedIn)
        navigate('/welcome');

      console.log("ahaha")
    },[isLoggedIn]);
    



   
    const verifsAttributs = () => {
      let emailError = "";
      let passwordError = "";
    
      // Vérification de l'attribut email
      if (!validation.validateEmail(email)) {
        emailError = "Veuillez saisir une adresse e-mail valide.";
      }

      // Vérification de l'attribut password
      if (!password) {
        passwordError = "Veuillez saisir un mot de passe.";
      } 
      setError({
        email: emailError,
        password: passwordError,
      });
    
      return !emailError ;
    };
    
    const handleLogin = async () => {
      if (verifsAttributs()) {
        const authRequest = { email, password };
        try {
          const response = await dispatch(login(authRequest));
          // Redirection vers la page d'accueil lorsque tout se passe bien
          if (response) {
            window.location.href = '/welcome'; // Remplacez '/accueil' par l'URL de la page d'accueil
          }
        } catch (error) {
          // Gestion des erreurs
          console.error(error);
        }
      }
    };
    
    return (
        <div className="login-container">
          <div className="login-content">
            <div className="content_first">
              <div className="ball-content">
                <BallCanvas icon={Images.logoApp} />
              </div>
            </div>
            <div className="content_second">
              <div className="content_second_left">
                <div className="line"></div>
                <img className="shadowed-image" src={Images.icon_waiting} />
                <div className="line"></div>
                <img className="shadowed-image" src={Images.icon_working} />
                <div className="line"></div>
                <img className="shadowed-image" src={Images.icon_done} />
              </div>
              <div className="content_second_right">
                <div className="content_title">
                  <span>Elevate your productivity with our cutting-edge task management app.</span>
                  <span>Streamline your workflow and experience unparalleled efficiency in modern development tools.</span>
                </div>
                <div className="page_body_second">
                  <div className="formulaire-login">
                    <img src={Images.logoApp} />
                    <span className="login-title"> Login There !</span>
                    <span className="line-login-form"></span>
                    <div className="inputs-container">
                      <div className="input-container">
                        <input onChange={(e)=>setEmail(e.target.value)} type="text" name="email" placeholder="itsanexample@gmail.com" />
                      </div>
                      <div className="input-container">
                        <input onChange={(e)=>setPassword(e.target.value)} type="password" name="password" placeholder="**************" />
                      </div>
                    <div className="button-submit" onClick={()=>handleLogin()}>
                      <span> Login </span>
                    </div>
                    <a className="register_here"  onClick={()=>{navigate('/register')}}> You dont have an account yet ? register here</a>
                    </div>
                  </div>
                  <div className="formulaire-errors">
                    {
                      error.email && (
                        <div className="error-input-field">
                          <img  src={Images.icon_error} />
                          <span>{error.email}</span>
                        </div>
                      )
                    }
                    {
                      error.password && (
                        <div className="error-input-field">
                          <img  src={Images.icon_error} />
                          <span>{error.password}</span>
                        </div>
                      )
                    }

                  </div>
                 
                </div>
              </div>
              
            </div>
          </div>
        </div>
    );
}

export default Login;