import React from 'react';
import classes from './InputElement.module.css'
const inputelement = (props) =>{

    let inputElement = null;
    const inputclasses = [classes.InputElement];
    if(props.invalid && props.shouldValidate && props.touched){
        inputclasses.push(classes.Invalid);
    }
    switch(props.elementType){
        case ( 'input' ):
            inputElement = <input 
             className={inputclasses.join(' ')}
             {...props.elementConfig} 
             value={props.value}
             onChange={props.inputchangehandler}
             />
             break;
        case ( 'textarea' ):
            inputElement = <textarea 
            className={inputclasses.join(' ')} {...props.elementConfig} value ={props.value}  
            onChange={props.inputchangehandler}/>
            break;
        case ( 'select' ):
            inputElement = (
                <select className={inputclasses.join(' ')} value={props.value}  onChange={props.inputchangehandler}>
                    {props.elementConfig.options.map(option =>(
                        <option key = {option.value} value ={option.value}>{option.displayValue}</option>)
                    )}
                </select>)
            break;
         default:
            inputElement = <input  onChange={props.inputchangehandler}
            className={inputclasses.join(' ')} {...props.elementConfig} value ={props.value}/>
    }
    return (
        <div className={classes.Input}>
        <label className={classes.Label}>{props.label}</label>
        {inputElement}
    </div>
    );
}
export default inputelement;