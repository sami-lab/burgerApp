import * as actionType from './actionType';
import axios from '../../axios-order'

export const purchaseBurgerSuccess = (id,orderData)=>{
      return {
          type: actionType.PURCHASE_BURGER_SUCCESS,
          orderId : id,
          orderData : orderData 
      }
}
export const purchaseBurgerFailed=(error)=>{
      return {
          type: actionType.PURCHASE_BURGER_FAILED,
          error: error
      }
}
export const PurchaseBurgerStart =()=>{
    return{
        type: actionType.PURCHASE_BURGER_START,
        
    }
}
export const PurchaseBurger =(orderData,token)=>{
    return dispatch=>{
        dispatch(PurchaseBurgerStart())
        axios.post('./order.json?auth='+token,orderData).then(response =>{
               dispatch(purchaseBurgerSuccess(response.data.name,orderData))
         }).catch(err=> dispatch(purchaseBurgerFailed(err)));
    }
}
export const PurchaseInit=()=>{
    return {
        type: actionType.PURCHASE_INIT
    }
}
export const fetchOrderStart=()=>{
   return {
       type:actionType.FETCH_ORDERS_START
   }
}
export const fetchOrderSucess= (OrderData)=>{
    return{
        type:actionType.FETCH_ORDERS_SUCCESS,
        orderData: OrderData
    }
}
export const fetchOrderFailed=(err)=>{
    return {
        type:actionType.FETCH_ORDERS_FAILED,
        error: err
    }
}

export const fetchOrders =(token,userId)=>{
    return dispatch=>{
        dispatch(fetchOrderStart())
        const queryParam = `?auth=${token}&orderBy="userId"&equalTo="${userId}"`;
        axios.get('/order.json'+queryParam)
            .then(res => {
                const fetchedOrders = [];
                for (let key in res.data) {
                    fetchedOrders.push({
                        ...res.data[key],
                        id: key
                    });
                }
               dispatch(fetchOrderSucess(fetchedOrders))
            })
            .catch(err => {
               dispatch(fetchOrderFailed(err))
            });
    }
}