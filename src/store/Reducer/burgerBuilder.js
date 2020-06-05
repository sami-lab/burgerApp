import * as actionType from '../Action/actionType';

const initialState ={
    ingredients: null,
    price: 4,
    error: false,
    building: false
}
const Ingredients_Price = {
    salad :0.5,
    bacon : 0.4,
    cheese :1.3,
    meat : 0.7
 }
const reducer =(state=initialState,action)=>{
      switch(action.type){
          case actionType.ADD_INGREDIENT:
              return{
                  ...state,
                    ingredients:{
                        ...state.ingredients,
                        [action.ingredientName] : state.ingredients[action.ingredientName]+1
                    },
                    price : state.price + Ingredients_Price[action.ingredientName],
                    building:true
              };
          case actionType.REMOVE_INGREDIENT:
                return{
                    ...state,
                    ingredients:{
                        ...state.ingredients,
                        [action.ingredientName] : state.ingredients[action.ingredientName]-1
                    },
                    price : state.price-Ingredients_Price[action.ingredientName],
                    building:true
                };
            case actionType.SET_INGREDIENT:
                return{
                    ...state,
                    ingredients: // action.Ingredients
                     {
                          salad: action.Ingredients.salad,
                          bacon: action.Ingredients.bacon,
                          cheese: action.Ingredients.cheese,
                          meat:  action.Ingredients.meat
                     },
                    price: 4,
                    error: false,
                    building: false
                };
            case actionType.FETCH_INGREDIENT_FAILED:
                return {
                    ...state,
                    error:true
                }          
           default:
               return state
      }
}
export default reducer;