import { updateObject, checkValidity } from '../../shared/utility';
import Spinner from '../../components/UI/Spinner/Spinner';
import Button from '../../components/UI/Button/Button';
import * as actions from '../../store/actions/index';
import Input from '../../components/UI/Input/Input';
import { Redirect } from 'react-router-dom';
import React, { Component } from 'react';
import classes from './Auth.module.css';
import { connect } from 'react-redux';
class Auth extends Component {

    state = {
        controls: {
            email: {
                elementType: "input",
                elementConfig: {
                    type: "email",
                    placeholder: "Mail Address"
                },
                value: "",
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: "input",
                elementConfig: {
                    type: "password",
                    placeholder: "Password"
                },
                value: "",
                validation: {
                    required: true,
                    isNumeric: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        },

        isSignup: true
    };

    componentDidMount() {
        if (!this.props.buildingBurger && this.props.authRedirectPath !== '/') {
            this.props.onSetAuthRedirectPath();
        };
    };

    inputChangedHandler = (event, controlName) => {
                
        const updatedControlsForm = updateObject(this.state.controls, {
            [controlName]: updateObject(this.state.controls[controlName], {
                value: event.target.value,
                valid: checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            })
        });

        this.setState({controls: updatedControlsForm});
    };

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup);
    };

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return {isSignup: !prevState.isSignup};
        });
    };

    render() {

        const formElementArray = [];

        for (let key in this.state.controls) {
            formElementArray.push({
                id: key,
                config: this.state.controls[key]
            });
        }
        
        let form = formElementArray.map(formElement => (            
            <Input
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed={(event) => this.inputChangedHandler(event, formElement.id)}
            />
        ));

        if (this.props.loading) {
            form = <Spinner />;
        };

        let errorMessage = null;
        if (this.props.error) {
            errorMessage = <p>{this.props.error.message}</p>;
        };

        let authRedirect = null;
        if (this.props.isAuthenticated) {
            authRedirect = <Redirect to={this.props.authRedirectPath} />;
        };

        return (
            <div className={classes.Auth}>
                {authRedirect}
                {errorMessage}
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button
                        btnType="Success"
                        disabled={!this.state.controls.email.valid || !this.state.controls.password.valid}
                        >SUBMIT</Button>
                </form>
                <Button
                    btnType="Danger"
                    clicked={this.switchAuthModeHandler}
                >SWITCH TO {this.state.isSignup ? 'SIGNIN' : 'SIGNUP'}</Button>
            </div>
        );
    };
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        buildingBurger: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath
    };
};

const mapDispatchToProps = dispach => {
    return {
        onAuth: (email, password, isSignup) => dispach(actions.auth(email, password, isSignup)),
        onSetAuthRedirectPath: () => dispach(actions.setAuthRedirectPath('/'))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);