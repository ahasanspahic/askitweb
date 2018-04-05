import React from 'react';
import { Redirect } from 'react-router-dom';
import {logout} from '../../actions/userActions.js';

class Logout extends React.Component {
    constructor() {
        super();
    }
    componentWillMount() {
        if(this.props.isLoggedProp)
            this.props.dispatchProp(logout());

    }

    render() {
        if (!this.props.isLoggedProp) {
            return <Redirect to="/login" />;
        }
        return(
            <div>
                <h3>You are logged out. :)</h3>
            </div>
        )
     }
 }

 export default Logout;