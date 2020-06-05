import React from 'react';
import classes from './CheckoutSummary.module.css'
import Burger from '../../Burger/Burger'
import Button from '../../UI/Button/Button'
const CheckoutSummary =(props)=>{
    return (
        <div className={classes.CheckOut}>
            <h1>Hope You Like It!!!</h1>
            <div style={{width:'100%' , margin:'auto'}}>
                <Burger ingredients = {props.ingredients}/>
            </div>
            <div >
            <Button btnType="Danger" clicked={props.checkoutCancel} >Cancel</Button>
            <Button btnType="Success" clicked={props.checkoutContinue} >Continue</Button>
            </div>
        </div>
     )
}
export default CheckoutSummary;