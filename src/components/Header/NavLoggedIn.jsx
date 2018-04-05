import React from 'react';
import { Route, Link } from 'react-router-dom';
import {Navbar, NavDropdown, NavItem, Nav, MenuItem} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

class NavLoggedIn extends React.Component {

    
    render() {
       return (
            <Nav pullRight>
            <LinkContainer to="/ask" className="nav-link">
                <NavItem eventKey={1}>Ask a question</NavItem>
            </LinkContainer>
            <LinkContainer to="/my-questions" className="nav-link">
                <NavItem eventKey={2}>My questions</NavItem>
            </LinkContainer>
            <LinkContainer to="/profile" className="nav-link">
                <NavItem eventKey={3}>Profile</NavItem>
            </LinkContainer>
            <LinkContainer to="/logout" className="nav-link">
                <NavItem eventKey={4}>Log out</NavItem>
            </LinkContainer>
          </Nav>
       );
    }
 }

 export default NavLoggedIn;