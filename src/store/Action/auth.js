import * as actionType from '../Action/actionType'
import axios from 'axios';
export const authStart =()=>{
    return{
        type: actionType.AUTH_START
    }
}
export const authSuccess =(token,userId)=>{
    return{
        type: actionType.AUTH_SUCCESS,
        idToken:token,
        userId:userId
    }
}
export const authFail =(error)=>{
    return{
        type: actionType.AUTH_FAILED,
        error:error
    }
}

export const logout=()=>{
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    localStorage.removeItem('expirationDate')
    return { 
        type: actionType.AUTH_LOGOUT
    }
}
export const CheckauthTimeOut= (expirytime)=>{
    return dispatch =>{
        setTimeout(() => {
            dispatch(logout())
        },expirytime*1000 );
    }
}
export const auth =(email,pass,IsSignUp)=>{
    return dispatch => {
        dispatch(authStart())
        const authData ={
            email: email,
            password: pass,
            returnSecureToken: true
        }
        const key = process.env.REACT_APP_API_KEY;
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='+key;
        if(!IsSignUp){
          url= `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${key}`;
        }
        axios.post(url,authData)
             .then(res=> {
                 const expirationDate = new Date(new Date().getTime()+res.data.expiresIn*1000)
                 localStorage.setItem('token',res.data.idToken)
                 localStorage.setItem('userId',res.data.localId)
                 localStorage.setItem('expirationDate',expirationDate)
                 dispatch(authSuccess(res.data.idToken,res.data.localId))
                 dispatch(CheckauthTimeOut(res.data.expiresIn))
                })
             .catch(err=> dispatch(authFail(err.response.data.error)))
    }
}
export const setAuthRedirectPath = (path)=>{
         return{
             type: actionType.SET_AUTH_REDIRECT_PATH,
             path : path
         }   
}

export const authCheckState=()=>{
     return dispatch=>{
         const token = localStorage.getItem('token');
         if(!token){
             dispatch(logout())
         }
         else{
             const expiryDate= new Date(localStorage.getItem('expirationDate'));
             if(expiryDate <= new Date()){
                 dispatch(logout())
             }
             dispatch(authSuccess(token,localStorage.getItem('userId')))
             dispatch(CheckauthTimeOut((expiryDate.getTime()-new Date().getTime())/1000))
         }
     }
}