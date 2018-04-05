import React from 'react';
import { Route, Link } from 'react-router-dom';
import {Navbar, NavDropdown, NavItem, Nav, MenuItem} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import NavLoggedIn from './Header/NavLoggedIn.jsx';
import NavLoggedOut from './Header/NavLoggedOut.jsx';

class Header extends React.Component {    
    render() {
        let navigate;
        // If Meteor.userID() is null then render <NavLoggedOut />, otherwise <NavLoggedIn />
        if(this.props.isLoggedProp)
          navigate=<NavLoggedIn />;
        else
          navigate=<NavLoggedOut />;
        let navbarFixed= {position: 'fixed',width:'100%'};
       return (
        <Navbar inverse staticTop={true} style={navbarFixed}>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/" className="nav-link">Ask.it</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
          <LinkContainer to="/questions" className="nav-link">
            <NavItem eventKey={1}>Questions</NavItem>
          </LinkContainer>
          </Nav>
          {navigate}
        </Navbar.Collapse>
      </Navbar>
       );
    }
 }

 export default Header;