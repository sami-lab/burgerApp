import React,{Component} from 'react';
import Order from '../../Components/Order/order'
import Spinner from '../../Components/UI/Spinner/Spinner'
import axios from '../../axios-order';
import {connect} from 'react-redux';
import * as actionCreator from '../../store/Action/index'
import withErrorHandler from '../../hoc/WithErrorHandler/withErrorHandler'
class Orders extends Component{
    // state={
    //     orders:[],
    //     loading: true
    // }
    componentDidMount() {
       this.props.OnInitOrder(this.props.token,this.props.userId)
    }
    render(){
        let orders = <Spinner/>
        if(!this.props.loading){ 
            orders = (
            <div>
                    {this.props.orders.map(orders=>(
                        <Order key ={orders.id}
                                ingredients ={orders.ingredients}
                                price={orders.price}
                        />
                    ))}
            </div>
            )
        }
        return orders
    }
}

const mapStateToProps =(state)=>{
    return {
       orders: state.order.orders,
       loading:state.order.loading,
       token : state.Auth.token,
       userId: state.Auth.userId
    }
}
const mapDispatchToProps =(dispatch)=>{
    return {
        OnInitOrder: (token,userId)=> dispatch(actionCreator.fetchOrders(token,userId))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(Orders,axios));