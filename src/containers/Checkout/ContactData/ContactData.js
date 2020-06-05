import React, { Component } from 'react';
import {connect} from 'react-redux'
import classes from './ContactData.module.css'
import Button from '../../../Components/UI/Button/Button';
import Spinner from '../../../Components/UI/Spinner/Spinner';
import axios from '../../../axios-order';
import Input from '../../../Components/UI/Input/InputElement'
import * as actionCreator from '../../../store/Action/index';
import withErrorHander from '../../../hoc/WithErrorHandler/withErrorHandler';
import {checkvalidity} from '../../shared/checkValidity'
class ContactData extends Component{
    state = {
        orderForm :{
        name: {
            elementType : 'input',
            elementConfig:{
                  type:'text',
                  placeholder: 'Your Name'
            },
            value: '',
            validation:{
                required : true
            },
            isValid : false,
            touched: false
        },
        email: {
            elementType : 'input',
            elementConfig:{
                  type:'email',
                  placeholder: 'Your E-Mail'
            },
            value: '',
            validation:{
                required : true,
                isEmail: true
            },
            isValid : false,
            touched: false
        },
        street: {
        elementType : 'input',
        elementConfig:{
              type:'text',
              placeholder: 'Street'
          },
        value: '',
        validation:{
            required : true
        },
        isValid : false
        },
        postalCode: {
            elementType : 'input',
            elementConfig:{
                  type:'text',
                  placeholder: 'ZIP Code'
            },
            value: '',
            validation:{
                required : true,
                isNumeric: true,
                minLength : 2,
                maxLength : 5
            },
            isValid : false,
            touched: false
        },
        country : {
            elementType : 'input',
            elementConfig:{
                  type:'text',
                  placeholder: 'Country'
            },
            value: '',
            validation:{
                required : true
            },
            isValid : false,
            touched: false
        },
        delieveryMethod : {
            elementType : 'select',
            elementConfig:{
                  options:[
                      {value : 'fastest', displayValue :'Fastest'},
                      {value : 'cheapest', displayValue :'Cheapest'}
                  ]
            },
            value: 'fastest',
            validation:{},
            isValid:true
        }
    },
        formvalidated: false
    }

    orderHandler = (event)=>{
        event.preventDefault();
         // alert('You continue!');
         this.setState({loading:true});
         const formdata ={};
         for(let formElementidentifier in this.state.orderForm){
             formdata[formElementidentifier] = this.state.orderForm[formElementidentifier].value;
         }
         const order ={
            ingredients : this.props.ings,
            price : this.props.price,
            orderData: formdata,
            userId: this.props.userId
         }
         this.props.OnOrderSubmit(order,this.props.token)
    }
    inputchangehandler = (event,inputIdentifier) =>{
        const updatedOrderForm ={
            ...this.state.orderForm
        };
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.isValid=  checkvalidity(updatedFormElement.value,updatedFormElement.validation);
        updatedFormElement.touched= true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        let formIsValid = true;
        for(let inputIdentifier in updatedOrderForm){
            formIsValid = updatedOrderForm[inputIdentifier].isValid && formIsValid
        }
        this.setState({orderForm:updatedOrderForm,formvalidated:formIsValid})
    }
   
    render(){
        const formElementArray =[];
        for(let key in this.state.orderForm){
            formElementArray.push({
                id:key,
                config: this.state.orderForm[key]
            });
        }
        let form = (
            <form onSubmit={this.orderHandler}>
                 {
                     formElementArray.map(formElement =>(
                         <Input key = {formElement.id}
                                elementType = {formElement.config.elementType}
                                elementConfig= {formElement.config.elementConfig}
                                value = {formElement.config.value}
                                invalid= {!formElement.config.isValid}
                                shouldValidate= {formElement.config.validation}
                                touched = {formElement.config.touched}
                                inputchangehandler = {(event) => this.inputchangehandler(event,formElement.id)}
                                />
                     ))
                 }
                <Button btnType="Success" disabled={!this.state.formvalidated} clicked={this.orderHandler}>ORDER</Button>
            </form>
        );
        if ( this.props.loading ) {
            form = <Spinner />;
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        );
    }
}
const mapStateToProps = state=> {
    return {
       ings:state.burgerbuilder.ingredients,
       price: state.burgerbuilder.price,
       loading:state.order.loading,
       token: state.Auth.token,
       userId: state.Auth.userId
    }
}
const mapDispatchToProps = dispatch =>{
    return {
        OnOrderSubmit : (OrderData,token) => dispatch(actionCreator.PurchaseBurger(OrderData,token))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(withErrorHander(ContactData,axios));