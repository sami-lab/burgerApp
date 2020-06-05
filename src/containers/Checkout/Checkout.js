import React,{Component} from 'react';
// import classes from './Checkout.module.css'
import {Route, Redirect} from 'react-router-dom';
import Contactdata from './ContactData/ContactData'
import CheckoutSummary from '../../Components/Order/CheckoutSummary/CheckoutSummary';
import {connect} from 'react-redux';
//import * as actionCreator from '../../store/Action/index'
class Checkout extends Component{
/*state= {
    ingredients: null,
    totalprice: 0
}
componentWillMount(){
    //to Search in Qyuery Param
    const query = new URLSearchParams(this.props.location.search);
    const ingredients ={};
    let price =0;
    for(let param of query.entries()){
        if(param[0] === 'price'){
            price = +param[1];
        }
        else
        ingredients[param[0]]= +param[1];
    }
    this.setState({ingredients:ingredients,totalprice:price})
}*/

checkoutCancelHandler=()=>{
    this.props.history.goBack();
}
checkoutoutContinueHandler = ()=>{
     this.props.history.replace('/checkout/contact-data')
}
render(){
    let summary = <Redirect to='/'/>
    if(this.props.ings){
        let purchased= this.props.purchased?<Redirect to='/'/>:null
          summary = (
            <div>
            {purchased}
            <CheckoutSummary 
                ingredients={this.props.ings}
                checkoutCancel={this.checkoutCancelHandler}
                checkoutContinue = {this.checkoutoutContinueHandler}
            />
            {/* {console.log(this.props.match.url+'/contact-data')} */}
           <Route path={'/checkout/contact-data'} component={Contactdata} />
           {/* render={(props)=> <Contactdata ingredients={this.state.ingredients} price = {this.state.totalprice} {...props} />} */}
        </div>
          )
    }
    return summary
   }
}
const mapStateToProps = state=> {
    return {
       ings:state.burgerbuilder.ingredients,
       purchased : state.order.purchased
    }
}
export default connect(mapStateToProps)(Checkout);