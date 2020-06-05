import React from 'react';
import {BrowserRouter} from 'react-router-dom'
import ReactDOM from 'react-dom';
import './index.css';
import {createStore,combineReducers,applyMiddleware,compose} from 'redux';
import thunk from 'redux-thunk'
import {Provider} from 'react-redux';
import burgerBuilderReducer from './store/Reducer/burgerBuilder'
import orderReducer from './store/Reducer/order'
import AuthReducer from './store/Reducer/auth'
import App from './App';
import * as serviceWorker from './serviceWorker';

const rootreducer = combineReducers({
    burgerbuilder: burgerBuilderReducer,
    order: orderReducer,
    Auth: AuthReducer
})
const composeEnhancers = process.env.NODE_ENV ==='development'? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__:null || compose;
const store = createStore(rootreducer,composeEnhancers(applyMiddleware(thunk)));
const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>
);
ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
