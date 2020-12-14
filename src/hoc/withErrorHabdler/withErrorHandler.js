import Modal from '../../components/UI/Modal/Modal';
import Auxiliary from '../Auxiliary/Auxiliary';
import React, { Component } from 'react';

const withErrorHandler = (WarrpedComponent, axios) => {
    return class extends Component {

        state = {
            err: null
        };
        
        componentWillMount() {
            this.reqInterceptor = axios.interceptors.request.use(reqConfig => {
                this.setState({err: null});
                return reqConfig;
            });
            this.resInterceptor = axios.interceptors.response.use(resConfig => resConfig, err => {
                this.setState({err: err});
            });
        }

        componentWillUnmount() {            
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }

        errorConfirmedHandler = () => {
            this.setState({err: null});
        }

        render() {
            return (
                <Auxiliary>
                    <Modal show={this.state.err} modalClosed={this.errorConfirmedHandler}>
                        {this.state.err ? this.state.err.message : null}
                    </Modal>
                    <WarrpedComponent {...this.props} />
                </Auxiliary>
            );
        }
    }
}

export default withErrorHandler;