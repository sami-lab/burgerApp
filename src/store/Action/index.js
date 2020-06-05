export {
    addIngredient,
    removeIngredient,
    initIngregients //Initializing Ingredients(axios)
} from './burgerBuilder';
export {
    PurchaseBurger, //for purchasing burger(axios)
    PurchaseInit,  //for redirecting to index page
    fetchOrders //for fetching order(axios)
} from './orders';

export {
    auth,
    logout,
    setAuthRedirectPath,
    authCheckState
} from './auth'