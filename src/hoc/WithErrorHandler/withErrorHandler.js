import React, { Component } from 'react';

import Modal from '../../Components/UI/Model/Model';
import Aux from '../Auxilary';

const withErrorHandler = ( WrappedComponent, axios ) => {
    return class extends Component {
        state = {
            error: null
        }
       //the reason to use this method instead of componentdidmount is that 
       //CDM call after all child component will render means 
       //CDM of child render where we are calling axios api so if error occur in this request
       //our interceptors is not called yet.
       //we can use constructor instead of CWM. We just want to set our interceptors 
        componentWillMount () {
            this.reqInter = axios.interceptors.request.use(req => {
                this.setState({error: null});
                return req;
            });
            this.resInter = axios.interceptors.response.use(res => res, error => {
                this.setState({error: error});
            });
        }
        //CWM call upon every request results in creating multiple interceptors So removinf this 
        componentWillUnmount(){
            axios.interceptors.request.eject(this.reqInter);
            axios.interceptors.request.eject(this.resInter);
        }
        errorConfirmedHandler = () => {
            this.setState({error: null});
        }

        render () {
            return (
                <Aux>
                    <Modal 
                        show={this.state.error}
                        modalClosed={this.errorConfirmedHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aux>
            );
        }
    }
}

export default withErrorHandler;