import React,{Component} from 'react';
import Input from '../../Components/UI/Input/InputElement'
import Button from '../../Components/UI/Button/Button';
import classes from './Auth.module.css';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom'
import Spinner from '../../Components/UI/Spinner/Spinner'
import * as actionCreator from '../../store/Action/index';
import {checkvalidity} from '../shared/checkValidity'
class Auth extends Component{
    state = {
        controls:{
            email: {
                elementType : 'input',
                elementConfig:{
                      type:'email',
                      placeholder: 'Your Email'
                },
                value: '',
                validation:{
                    required : true,
                    isEmail: true
                },
                isValid : false,
                touched: false
            },
            password: {
                elementType : 'input',
                elementConfig:{
                      type:'password',
                      placeholder: 'Your Password'
                },
                value: '',
                validation:{
                    required : true,
                    minLength: 6
                },
                isValid : false,
                touched: false
            }
        },
        formvalidated: false,
        IsSignUp: false
    }
    componentDidMount(){//if user is not building burger means building is false so we redirect him
        //to homepage after sucess(setting return url to / simply)
        if(!this.props.building && this.props.authRedirectpath !== '/')
        {      
            this.props.OnsetAuthRedirectPath()
        }
    }
    SwitchAuthModeHandler =()=>{
             this.setState(prevState=>{
                 return{IsSignUp: !prevState.IsSignUp}
             })
    }
    inputchangehandler = (event,inputIdentifier) =>{
        const updatedControls ={
            ...this.state.controls,
            [inputIdentifier]: {
                ...this.state.controls[inputIdentifier],
                value: event.target.value,
                isValid : checkvalidity(event.target.value,this.state.controls[inputIdentifier].validation),
                touched:true
            }                    
        }
        let formIsValid = true
        for(let inputIdentifier in updatedControls){
             formIsValid = updatedControls[inputIdentifier].isValid && formIsValid
        }
        this.setState({controls:updatedControls,formvalidated:formIsValid})
    }
   
    authHandler=(event)=>{
        event.preventDefault();
            this.props.OnAuthenticate(this.state.controls.email.value,this.state.controls.password.value,this.state.IsSignUp)
    }
   render(){
        const formElementArray =[];
        for(let key in this.state.controls){
            formElementArray.push({
                id:key,
                config: this.state.controls[key]
            });
        }

        let form =  formElementArray.map(formElement =>(
            <Input key = {formElement.id}
                   elementType = {formElement.config.elementType}
                   elementConfig= {formElement.config.elementConfig}
                   value = {formElement.config.value}
                   invalid= {!formElement.config.isValid}
                   shouldValidate= {formElement.config.validation}
                   touched = {formElement.config.touched}
                   inputchangehandler = {(event) => this.inputchangehandler(event,formElement.id)}
                   /> 
        )); 
        if(this.props.loading){
            form=<Spinner/>
        }
        let errormessage = null;
        if(this.props.error){
            errormessage= <p>{this.props.error.message}</p>
        }
        let redirect =null;
        if(this.props.IsAuthenticated){
           redirect= <Redirect to={this.props.authRedirectpath}/>
        }         
       return (
           <div className={classes.Auth}>
                {redirect}
                {errormessage}
                <form onSubmit={this.authHandler}>
                    {form}
                    <Button btnType = "Success">SUBMIT</Button>
                </form>
                    <Button btnType = "Danger" clicked={this.SwitchAuthModeHandler}>SWITCH TO {this.state.IsSignUp? 'SIGNIN' : 'SIGNUP'}</Button>
            </div>
       );
   }
}
const mapStateToProps=(state)=>{
    return{
        IsAuthenticated: state.Auth.token !==null,
        loading: state.Auth.loading,
        error: state.Auth.error,
        building: state.burgerbuilder.building,
        authRedirectpath: state.Auth.authRedirectPath
    }
}
const mapDispatchToProps=(dispatch)=>{
    return{
          OnAuthenticate: (email,pass,IsSignUp)=>dispatch(actionCreator.auth(email,pass,IsSignUp)),
          OnsetAuthRedirectPath: ()=> dispatch(actionCreator.setAuthRedirectPath('/'))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Auth);