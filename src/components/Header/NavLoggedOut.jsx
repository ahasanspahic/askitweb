import React from 'react';
import { Route, Link } from 'react-router-dom';
import {Navbar, NavDropdown, NavItem, Nav, MenuItem} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

class NavLoggedOut extends React.Component {

    
    render() {
       return (
            <Nav pullRight>
                <LinkContainer to="/login" className="nav-link">
                    <NavItem eventKey={1}>Login</NavItem>
                </LinkContainer>
                <LinkContainer to="/register" className="nav-link">
                    <NavItem eventKey={1}>Register</NavItem>
                </LinkContainer>
          </Nav>
       );
    }
 }

 export default NavLoggedOut;