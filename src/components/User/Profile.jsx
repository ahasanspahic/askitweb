import React from 'react';
import { Redirect } from 'react-router-dom';
import {changePassword, successNotificationShowed} from '../../actions/userActions.js';
class Profile extends React.Component {
    constructor() {
        super();
        this.state= {
            changingPassword: false,
            oldPassword: '',
            password: '',
            confirmPassword: '',
            passwordMismatchError: null,
        }
        this.changePasswordHandler = this.changePasswordHandler.bind(this);
        this.oldPasswordHandler = this.updateOldPassword.bind(this);
        this.passwordHandler = this.updatePassword.bind(this);
        this.confirmPasswordHandler = this.updateConfirmPassword.bind(this);
    }
    changePasswordHandler(e) {
        e.preventDefault();
        if(this.state.password == this.state.confirmPassword) {
            this.setState({changingPassword: true});
            this.props.dispatchProp(changePassword(this.state.oldPassword,this.state.password,
                this.props.userIdProp, this.props.tokenProp));
                document.getElementById('oldPassword').value = '';
                document.getElementById('newPassword').value = '';
                document.getElementById('confirmPassword').value = '';
                this.setState({passwordMismatchError: null});
        }
        else {
            this.setState({passwordMismatchError: "Password mismatch."});
        }
    }
    updateOldPassword(e) {
        this.setState({oldPassword: e.target.value});
    }
    updatePassword(e) {
        this.setState({password: e.target.value});
    }
    updateConfirmPassword(e) {
        this.setState({confirmPassword: e.target.value});
    }
    componentWillMount() {
        if(this.props.successMessageShowedProp){
            this.props.dispatchProp(successNotificationShowed());            
        }
    }
    render() {
        if (!this.props.isLoggedProp) {
            return <Redirect to="/login" />;
        }
        return (
            <div className="row">
                <div className="col-xs-offset-4 col-xs-4">
                <h4>Hello, {this.props.usernameProp} </h4>
                <div> You can change your password here.</div>
                <form onSubmit={this.changePasswordHandler} className="form-horizontal">
                    <div className="form-group">
                        <label forname="oldPassword" className="form-group">Old password:</label>  
                        <input type="password" onChange = {this.oldPasswordHandler} id="oldPassword" className="form-control"/>                 
                    </div>
                    <div className="form-group">
                        <label forname="newPassword" className="form-group">New password:</label>  
                        <input type="password" onChange = {this.passwordHandler} id="newPassword" className="form-control"/>                 
                    </div>
                    <div className="form-group">
                        <label forname="confirmPassword" className="form-group">Confirm new password:</label>  
                        <input type="password" onChange = {this.confirmPasswordHandler} id="confirmPassword" className="form-control"/>                 
                    </div>
                    {
                        this.props.fetchingProp && 
                        <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                    }
                    {
                        this.props.successMessageShowedProp &&
                        <div className="alert alert-success form-group">
                            <strong>Success!</strong> Password has been changed.
                        </div>
                    }
                    {
                        this.state.passwordMismatchError != null &&
                        <div className="alert alert-danger form-group">
                            <strong>{this.state.passwordMismatchError}</strong>
                        </div>
                    }
                    {
                        this.props.changePasswordErrorProp != null &&
                        <div className="alert alert-danger form-group">
                            <strong>{this.props.changePasswordErrorProp}</strong>
                        </div>
                    }
                    <input type="submit" value="Change password" />
                </form>
            </div>
           </div>
        );
     }
 }

 export default Profile;