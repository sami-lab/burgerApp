import * as actionType from '../Action/actionType';

const initialstate = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    authRedirectPath: '/'
}

const reducer = (state=initialstate,action)=>{
    switch(action.type){
        case actionType.AUTH_START:
            return {
                ...state,
                error:null,
                loading: true
            };
        case actionType.AUTH_SUCCESS:
            return { 
                ...state,
                token: action.idToken,
                userId: action.userId,
                error:null,
                loading:false
            }
        case actionType.AUTH_FAILED:
            return{
                ...state,
                error:action.error,
                loading:false
            }
        case actionType.AUTH_LOGOUT:
            return{
                ...state,
                userId:null,
                token:null
            }
        case actionType.SET_AUTH_REDIRECT_PATH:
            return{
                ...state,
                authRedirectPath: action.path
            }
         default:
            return state
    }
}
export default reducer;