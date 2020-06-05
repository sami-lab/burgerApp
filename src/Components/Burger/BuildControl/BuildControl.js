import React from 'react';
import classes from './BuildControl.module.css'
import BuildControl from './BuildControl/BuildControl';
const controls = [
    {label : 'Salad',type :'salad'},
    { label : 'Bacon',type: 'bacon'},
    {label : 'Cheese',type: 'cheese'},
    {label : 'Meat', type: 'meat'}
]
const buildControl = (props)=>(
        <div className={classes.BuildControls}>
           <p>Current Price is: <strong>{props.price.toFixed(2)}</strong></p>
           {controls.map(ctrl => (
               <BuildControl key ={ctrl.label} 
                             label={ctrl.label} 
                             added = {()=> props.ingredientsadded(ctrl.type)} 
                             removed ={()=> props.ingredientsremove(ctrl.type)}
                             disabled = {props.disabled[ctrl.type]}/>
            ))}
            <button className={classes.OrderButton} 
              disabled ={!props.disabledpurchase}
              onClick= {props.showmodel}>ORDER NOW!</button>
        </div>
);
export default buildControl;