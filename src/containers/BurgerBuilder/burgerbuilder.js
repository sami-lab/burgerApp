import React, {Component} from 'react';
import Aux from '../../hoc/Auxilary';
import {withRouter} from 'react-router-dom'
import Burger from '../../Components/Burger/Burger';
import BuildControl from '../../Components/Burger/BuildControl/BuildControl';
import Model from '../../Components/UI/Model/Model'
import OrderSummery from '../../Components/Burger/OrderSummary/OrderSummery';
import axios from '../../axios-order';
import Spinner from '../../Components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/WithErrorHandler/withErrorHandler';
import {connect} from 'react-redux';
import * as actionCreator from '../../store/Action/index'

export class Burgerbuilder extends Component{
   state = {
      purchasing: false
   };
   componentDidMount(){
      this.props.OnInitIngredients();
   }
   /*addingredients = (type)=>{
        const oldcount = this.state.ingredients[type];
        const updatedcount = oldcount+1;
        const updatedIngredients= {
           ...this.state.ingredients
        };
        updatedIngredients[type] = updatedcount; 
        const addedprice = Ingredients_Price[type];
        const oldprice = this.state.price;
        const newprice= oldprice + addedprice;
        this.setState({
           price : newprice,
           ingredients: updatedIngredients
        });
        this.updatepurchasestate(updatedIngredients);
   }
     removingredients = (type)=>{
      const oldcount = this.state.ingredients[type];
      if(oldcount <= 0){
         return;
      }
      const updatedcount = oldcount-1;
      const updatedIngredients= {
         ...this.state.ingredients
      };
      updatedIngredients[type] = updatedcount; 
      const pricededuction = Ingredients_Price[type];
      const oldprice = this.state.price;
      const newprice= oldprice - pricededuction;
      this.setState({
         price : newprice,
         ingredients: updatedIngredients
      });
      this.updatepurchasestate(updatedIngredients);
      } */
     updatepurchasestate(ingredients){ 
        const sum = Object.keys(ingredients)
                  .map(igkey => {
                      return ingredients[igkey];
                  })
                  .reduce((sum,el)=>{
                     return sum+el;
                  },0);
         return sum > 0
      }
     purchaseHandler = () => {
        if(this.props.IsAuthenticated){
           this.setState({purchasing: true});
        }
        else{
           this.props.onSetAuthRedirectPath('/checkout');
           this.props.history.push('/auth')
        }
     }
 
     purchaseCancelHandler = () => {
         this.setState({purchasing: false});
     }
 
     purchaseContinueHandler = () => {
        /*const queryParams = [];
        //it works like for loop it iterates over key
        for(let i in this.state.ingredients){
           queryParams.push(encodeURIComponent(i) +'='+encodeURIComponent(this.state.ingredients[i]))
        }
        queryParams.push('price='+this.props.price);
        const querystring= queryParams.join('&');*/
        this.props.onInitPurchase()
        this.props.history.push({
           pathname : '/checkout'
           //search : '?'+querystring
         })
        
     }
     render(){
        const disbledingredients ={
           ...this.props.ings
        }
        for(let keys in disbledingredients){
           disbledingredients[keys]= disbledingredients[keys] <= 0
        }
           let orderSummery = null;
           let burger = this.props.error? <h1>Ingredients can't be Loaded at moments</h1>:<Spinner/>
           if(this.props.ings){
              burger = (
               <Aux>
                     <Burger ingredients={this.props.ings} />
                     <BuildControl ingredientsadded={this.props.OnIngredientAdded} 
                                 ingredientsremove={this.props.OnIngredientRemoved}
                                 disabled = {disbledingredients}
                                 disabledpurchase ={this.updatepurchasestate(this.props.ings)}
                                 price = {this.props.price}
                                 showmodel= {this.purchaseHandler}/>
               </Aux>
              );
              orderSummery = <OrderSummery ingredients ={this.props.ings} 
                  purchaseCancelled={this.purchaseCancelHandler}
                  purchaseContinued = {this.purchaseContinueHandler}
                 price ={this.props.price} />;
           }
         //   if(this.state.loading){
         //    orderSummery = <Spinner/>
         //    }
         return (
            <Aux>
                <Model show={this.state.purchasing} modalClosed = {this.purchaseCancelHandler}>
                   {orderSummery}
                </Model>
                 {burger}
            </Aux>
         );
     }
}

const mapStateToProps = state=> {
        return {
           ings:state.burgerbuilder.ingredients,
           price: state.burgerbuilder.price,
           error : state.burgerbuilder.error,
           IsAuthenticated:state.Auth.token !==null
        }
}
const mapDispatchToProps = dispatch =>{
     return{
        OnIngredientAdded : (ingName)=>dispatch(actionCreator.addIngredient(ingName)),
        OnIngredientRemoved : (ingName)=>dispatch(actionCreator.removeIngredient(ingName)),
        OnInitIngredients : ()=> dispatch(actionCreator.initIngregients()),
        onInitPurchase : ()=>dispatch(actionCreator.PurchaseInit()) ,
        onSetAuthRedirectPath: (path)=>dispatch(actionCreator.setAuthRedirectPath(path))
     }
}
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(Burgerbuilder,axios)));