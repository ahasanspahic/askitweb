import React from 'react';
import {login} from '../../actions/userActions.js';
import {history}  from "../../store.js";

class Login extends React.Component {
    constructor() {
        super();
        this.state= {
            logging: false,
            username: '',
            usernameError: null,
            password: '',
            passwordError: null,
        }
        this.loginHandler = this.login.bind(this);
        this.usernameHandler = this.updateUsername.bind(this);
        this.passwordHandler = this.updatePassword.bind(this);
        this.validateHandler = this.validateForm.bind(this);
    }
    login(e) {
        e.preventDefault();
        let isValid = this.validateForm();
        if(isValid) {
            this.setState({logging: true});
            this.props.dispatchProp(login(this.state.username,this.state.password));
            //history.push('/');
        }
    }
    componentWillUpdate() {        
        if(this.props.loggingErrorProp != null && this.state.logging) {
            this.setState({logging: false});
        }
    }
    componentDidUpdate() {
        if(this.props.isLoggedProp)
            history.push('/');
    }
    updateUsername(e) {
        this.setState({username: e.target.value});
    }
    updatePassword(e) {
        this.setState({password: e.target.value});
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
        return isValid;
    }
    componentWillMount() {
        if(this.props.isLoggedProp)
            history.push('/');
    }
    render() {
        let formGroupUsername = this.state.usernameError == null ? "form-group" : "form-group has-error";
        let formGroupPassword = this.state.passwordError == null ? "form-group" : "form-group has-error";
        return (
            <div className="row">
                <div className="col-xs-offset-4 col-xs-4">
                    <h4>Login</h4>
                    <form onSubmit={this.loginHandler} className="form-horizontal">
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
                        {
                            this.state.logging && !this.props.isLoggedProp && this.props.loggingErrorProp == null &&
                            <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                        }
                        {
                            this.props.loggingErrorProp != null &&
                            <div className="alert alert-danger form-group">
                                <strong>Login failed!</strong> {this.props.loggingErrorProp}
                            </div>
                        }
                        <input className="btn btn-primary" type="submit" value="Login" />
                    </form>
                </div>
           </div>
        );
     }
 }

 export default Login;