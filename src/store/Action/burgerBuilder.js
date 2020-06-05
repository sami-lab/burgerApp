import * as actionType from './actionType';
import axios from '../../axios-order';
export const addIngredient =(name)=>{
      return {
          type: actionType.ADD_INGREDIENT,
          ingredientName: name
      }
}

export const setIngredient = Ingredients =>{
    return { 
        type: actionType.SET_INGREDIENT,
        Ingredients: Ingredients
    }
}
export const FetchIngredientFailed =()=>{
    return {
        type: actionType.FETCH_INGREDIENT_FAILED
    }
}
export const initIngregients=()=>{
     return dispatch =>{
            axios.get('https://burger-maker-1b07b.firebaseio.com/ingredients.json')
            .then(res =>{
                 dispatch(setIngredient(res.data))   
            }).catch(err => dispatch(FetchIngredientFailed()) )
     }
}
export const removeIngredient =(name)=>{
    return {
        type: actionType.REMOVE_INGREDIENT,
        ingredientName: name
    };
}