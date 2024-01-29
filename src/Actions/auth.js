
import authService from "../Services/auth.service";
import { FINISH_LOADING, LOGIN_SUCCESS, LOGOUT, REGISTER_FAIL, REGISTER_SUCCESS, UPDATE_STATE } from "./type";

    
export const register = (registerReq) => async (dispatch) => {
    
    return   authService
            .register(registerReq)
            .then((response)=> {
                dispatch({
                    type : FINISH_LOADING
                })
                dispatch({
                    type:REGISTER_SUCCESS,
                });
                dispatch({
                    type : UPDATE_STATE
                })
                return Promise.resolve();
            },(error)=>{
                console.log("eroror")
                dispatch({
                    type : FINISH_LOADING
                })
                dispatch({
                    type:REGISTER_FAIL, 
                });
                dispatch({
                    type : UPDATE_STATE
                })
                return Promise.reject();
            });
};
        
export const login = (authReq) => (dispatch) => {
    return authService
      .login(authReq)
      .then((response) => {
        // Traitement réussi
        const userJson = JSON.stringify(response.data.user);
        localStorage.setItem("user", userJson);
        localStorage.setItem("accessToken", response.data.accessToken);
        localStorage.setItem("refreshToken", response.data.refreshToken);
        dispatch({
          type: LOGIN_SUCCESS,
          payload: response.data.user,
        });
        dispatch({
          type: UPDATE_STATE,
        });
        dispatch({
          type: UPDATE_STATE,
        });
        return response; // Renvoyer la réponse du serveur dans la résolution de la promesse
      })
      .catch((error) => {
        throw error; // Lancer une erreur pour être capturée par le gestionnaire d'erreurs
      });
  };

export const logout = () => (dispatch) =>  {
    dispatch({
        type : LOGOUT
    })
}
