import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { slideIn } from "../../utils/motion";
import { EarthCanvas } from "../../Component/Canvas";
import "./Register.css";
import Images from "../../assets";
import StarsCanvas from "../../Component/Canvas/Stars";
import { register } from "../../Actions/auth";
import { useDispatch, useSelector } from "react-redux";
import { REGISTER_LOADING } from "../../Actions/type";
import { useNavigate } from "react-router";
import { InputFieldRegister } from "../../Component";
import validation from "../../utils/validation";
import { PopUpErrorsRegister, PopUpResponse } from "../../Component/PopUp/PopUps";






const RegisterContent = () => {

  const formRef = useRef();
  const dispatch = useDispatch();
  const {loading,IsRegisteredFailed} = useSelector(state=>state.auth);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword : "",
  });

  const [error, setError] = useState({
    email : "",
    firstName : "",
    lastName : "",
    password : "",
    confirmPassword : ""
  })

  const [popUpErrors, setPopUpErrors] = useState(false); 

  const handleChange = (e) => {
    const { target } = e;
    const { name, value } = target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const validateConfirmPassword = (password, confirmPassword) => {
    return password === confirmPassword;
  };
  
  function verifsAttributs() {
    const { email, firstName, lastName, password, confirmPassword } = form;
    let emailError = "";
    let firstNameError = "";
    let lastNameError = "";
    let passwordError = "";
    let confirmPasswordError = "";
  
    // Vérification de l'attribut email
    if (!validation.validateEmail(email)) {
      emailError = "Veuillez saisir une adresse e-mail valide.";
    }
  
    // Vérification de l'attribut firstName
    if (!firstName) {
      firstNameError = "Veuillez saisir votre prénom.";
    }
  
    // Vérification de l'attribut lastName
    if (!lastName) {
      lastNameError = "Veuillez saisir votre nom de famille.";
    }
  
    // Vérification de l'attribut password
    if (!validation.validatePassword(password)) {
      passwordError =
        "Le mot de passe doit avoir une longueur minimale de 8 caractères et contenir au moins une lettre majuscule, une lettre minuscule et un chiffre.";
    }
  
    // Vérification de l'attribut confirmPassword
    if (!validateConfirmPassword(password, confirmPassword)) {
      confirmPasswordError = "Les mots de passe ne correspondent pas.";
    }
  
    setError({
      email: emailError,
      firstName: firstNameError,
      lastName: lastNameError,
      password: passwordError,
      confirmPassword: confirmPasswordError,
    });
  
    return !emailError && !firstNameError && !lastNameError && !passwordError && !confirmPasswordError;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!verifsAttributs()){
      console.log("hi")
      setPopUpErrors(true);
      return;
    }
    else{
      dispatch({
        type : REGISTER_LOADING
      });
      dispatch(register({...form}));
    }
  }

  return (
    <> 
      <div
        className={`register-page-container`}
      >
        <motion.div
          variants={slideIn("left", "tween", 0.2, 1)}
          className='register-page-left'
        >
          <div className="register-page-left-header">
              <div className="register-page-left-header_top">
                  <img src={Images.logoApp} />
                  <span> Tasks Up </span>
              </div>
              <div className="register-page-left-header_medium">
                  <div> 
                      <img src={Images.icon_link} />
                      <span>Experience the benefits of joining us!</span>
                  </div>
                  <h3> Register now to take control of your tasks and enhance <span>your user experience.</span></h3>
              </div>
          </div>
          {IsRegisteredFailed && <span> Register Failed , make sure to fill all the fields</span>}
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="formulaire-register"
          >

            <div className="inputs-register-container">
              <InputFieldRegister
                type="text"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                placeholder="First Name"
              />

              <InputFieldRegister
                type="text"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                placeholder="Second Name"
              />
            </div>

            <div className="inputs-register-container">
              <InputFieldRegister
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="emailexample@gmail.com"
              />
            </div>

            <div className="inputs-register-container">
              <InputFieldRegister
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Password"
              />

              <InputFieldRegister
                type="password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="Password Confirmation"
              />
            </div>
            <button
              type='submit'
              className='custom-button-register'
            >
              {loading && <div class="lds-dual-ring"></div>} 
              <span>{loading ? "Registring..." : "Register"}</span>
            </button>
          </form> 

          <a onClick={()=>{navigate('/login')}}> You Have an accout already ? click here </a>
          <div className="list-images">
              <img src={Images.icon_zz2} />
              <img src={Images.icon_gl} />
              <img src={Images.logo_isima} />
              <img src={Images.icon_ensias} />
          </div>
        </motion.div>

        <motion.div
          variants={slideIn("right", "tween", 0.2, 1)}
          className='register-page-right'
        >
          <EarthCanvas />
        </motion.div>

      {popUpErrors && <PopUpErrorsRegister error = {error} closePopUp={(e)=>setPopUpErrors(e)} />}

      </div>


    </>
    
  );
};

const Register = () => {
  const {IsRegisteredSucess} = useSelector(state=>state.auth);  
  return (
    <>
      {IsRegisteredSucess && <PopUpResponse/>}
      <RegisterContent />
      <StarsCanvas />
    </>
  )
}


export default Register;