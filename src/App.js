import React,{Component,Suspense} from 'react';
import {Route,Switch,withRouter, Redirect} from 'react-router-dom'
import Layout from './Components/Layout/Layout';
import Burgerbuilder from './containers/BurgerBuilder/burgerbuilder'
import Logout from './containers/Auth/Logout/logout';
import * as actionCreator from './store/Action/index';
import {connect} from 'react-redux';

const AsynCheckout= React.lazy(()=> import('./containers/Checkout/Checkout'))
const AsynOrder= React.lazy(()=> import('./containers/Orders/Orders'))
const AsynAuth= React.lazy(()=> import('./containers/Auth/Auth'))
class App extends Component{
  componentDidMount(){
    this.props.OnTrySignUp();
  }
  render(){
    let routes = (
      <Switch>
        <Route path='/auth' render={()=>(
          <Suspense fallback={<div>Loading...</div>}><AsynAuth/></Suspense>
          )}/>
        <Route path='/' exact component={Burgerbuilder}/>
        <Redirect to='/'/>
      </Switch>
    )
    if(this.props.IsAuthenticated){
     routes=  <Switch>
          <Route path='/Checkout' render={()=> (
              <Suspense fallback={<div>Loading...</div>}><AsynCheckout {...this.props}/></Suspense>          
          )}/>
          <Route path='/Orders' render={()=>(
          <Suspense fallback={<div>Loading...</div>}><AsynOrder {...this.props}/></Suspense>
          )}/>
          <Route path='/auth' render={()=>(
          <Suspense fallback={<div>Loading...</div>}><AsynAuth {...this.props}/></Suspense>
          )}/>
          <Route path='/logout' component={Logout}/>
          <Route path='/' exact component={Burgerbuilder}/>
          <Redirect to='/'/>
      </Switch>    
    }
    return (
        <div>
              <Layout>
                {routes}
              </Layout>
             
        </div>
    );
  }
} 
const mapStateToProps =(state)=>{
  return {
    IsAuthenticated: state.Auth.token !== null
  }
}
const mapDispatchToProps =(dispatch)=>{
  return{
    OnTrySignUp : () => dispatch(actionCreator.authCheckState())
  }
}
//due to connect we cant be able to pass props of our app to all child 
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App));