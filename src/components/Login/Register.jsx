import React from 'react'
import {register, successNotificationShowed} from '../../actions/userActions.js';
import {history}  from "../../store.js";
import { Link } from 'react-router-dom';
class Register extends React.Component {
    constructor() {
        super();
        this.state= {
            registering: false,
            username: '',
            password: '',
            confirmPassword: '',
            usernameError: null,
            passwordError: null,
            confirmPasswordError: null,
            passwordMismatchError: null,
        }
        this.registerHandler = this.register.bind(this);
        this.usernameHandler = this.updateUsername.bind(this);
        this.passwordHandler = this.updatePassword.bind(this);
        this.confirmPasswordHandler = this.updateConfirmPassword.bind(this);
    }
    register(e) {
        e.preventDefault();
        let isValid = this.validateForm();
        if(isValid) {
            if(this.state.password == this.state.confirmPassword) {
                this.setState({registering: true});
                this.props.dispatchProp(register(this.state.username,this.state.password));
                this.setState({passwordMismatchError: null});
            }
            else {
                this.setState({passwordMismatchError: "Password mismatch."});
            }
        }
    }
    updateUsername(e) {
        this.setState({username: e.target.value});
    }
    updatePassword(e) {
        this.setState({password: e.target.value});
    }
    updateConfirmPassword(e) {
        this.setState({confirmPassword: e.target.value});
    }
    componentDidUpdate() {
        if(this.props.successMessageShowedProp) {
            document.getElementById('username').value = '';
            document.getElementById('password').value = '';
            document.getElementById('confirmPassword').value = '';
        }
    }
    validateForm() {
        let isValid = true;
        if(this.state.username.trim().length == 0){
            this.setState({usernameError: "Username is required."});
            isValid=false;
        }
        else {
            this.setState({usernameError: null});
        }
        if(this.state.password.trim().length == 0){
            this.setState({passwordError: "Password is required."});
            isValid = false;
        }
        else {
            this.setState({passwordError: null});
        }
        if(this.state.confirmPassword.trim().length == 0){
            this.setState({confirmPasswordError: "Confirm password is required."});
            isValid = false;
        }
        else {
            this.setState({confirmPasswordError: null});
        }
        return isValid;
    }
    componentWillMount() {
        if(this.props.isLoggedProp)
            history.push('/');
        if(this.props.successMessageShowedProp)
            this.props.dispatchProp(successNotificationShowed());
    }
    render() {
        let formGroupUsername = this.state.usernameError == null ? "form-group" : "form-group has-error";
        let formGroupPassword = this.state.passwordError == null ? "form-group" : "form-group has-error";
        let formGroupConfirmPassword = this.state.confirmPasswordError == null ? "form-group" : "form-group has-error";
        return (
            <div className="row">
                <div className="col-xs-offset-4 col-xs-4">
                <h4>Register </h4>
                <form onSubmit={this.registerHandler} className="form-horizontal">
                    <div className={formGroupUsername}>
                        <label forname="username" className="form-group"> Username:</label>  
                        <input type="text" onChange = {this.usernameHandler} id="username" className="form-control"/>  
                        <label className="help-block">{this.state.usernameError}</label>                
                    </div>
                    <div className={formGroupPassword}>
                        <label forname="password" className="form-group"> Password:</label>  
                        <input type="password" onChange = {this.passwordHandler} id="password" className="form-control"/>  
                        <label className="help-block">{this.state.passwordError}</label>                
                    </div>
                    <div className={formGroupConfirmPassword}>
                        <label forname="confirmPassword" className="form-group"> Confirm password:</label>  
                        <input type="password" onChange = {this.confirmPasswordHandler} id="confirmPassword" className="form-control"/>  
                        <label className="help-block">{this.state.confirmPasswordError}</label>                
                    </div>
                    {
                        this.props.fetchingProp && 
                        <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                    }
                    {
                        this.props.successMessageShowedProp &&
                        <div className="alert alert-success">
                            <strong>Success!</strong> Your account has been created.<Link to="/login" >Login</Link>
                        </div>
                    }
                    {
                        this.state.passwordMismatchError != null &&
                        <div className="alert alert-danger form-group">
                            <strong>{this.state.passwordMismatchError}</strong>
                        </div>
                    }
                    {
                        this.props.registerErrorProp != null &&
                        <div className="alert alert-danger form-group">
                            <strong>{this.props.registerErrorProp}</strong>
                        </div>
                    }
                    <input type="submit" value="Register" />
                </form>
            </div>
           </div>
        );
     }
 }

 export default Register;