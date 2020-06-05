import React,{Component} from 'react';
import {connect} from 'react-redux';
import * as actionCreator from '../../../store/Action/index';
import {Redirect} from 'react-router-dom'
class Logout extends Component{
    componentDidMount(){
        this.props.OnLogout()
    }
    render(){
        return (
            <Redirect to='/' />
        )
    }
}
const mapDispatchToProps=(dispatch)=>{
   return{
       OnLogout : () => dispatch(actionCreator.logout())
   }
}
export default connect(null,mapDispatchToProps)(Logout);