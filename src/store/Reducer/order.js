import * as actionType from '../Action/actionType'

const initialState={
    orders:[],
    loading: false,
    purchased:false
}
const reducer =(state=initialState,action)=>{
        switch(action.type){
            case actionType.PURCHASE_INIT:
                return {
                      ...state,
                      purchased: false
                }
            case actionType.PURCHASE_BURGER_START:
                return {
                      ...state,
                      loading:true
                };
            case actionType.PURCHASE_BURGER_SUCCESS:
                const newOrder = {
                    ...action.orderData,
                    id: action.orderId
                }
                return {
                   ...state,
                   loading:false,
                   purchased:true,
                   orders: state.orders.concat(newOrder)
                };
            case actionType.PURCHASE_BURGER_FAILED:
                return {
                    ...state,
                    loading:false
                }
            case actionType.FETCH_ORDERS_START:
                return {
                    ...state,
                    loading:true
                }
            case actionType.FETCH_ORDERS_SUCCESS:
                return {
                    ...state,
                    orders:action.orderData,
                    loading:false
                }
            case actionType.FETCH_ORDERS_FAILED:
                return{
                    ...state,
                    loading:false      
                }

            default:
                return state    
        }
};

export default reducer;