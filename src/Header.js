import React from 'react';
import {
  Navbar,
  Nav,
  NavItem,
  NavDropdown,
  MenuItem,
  Glyphicon
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Header = () => (
  <Navbar fluid>
    <Navbar.Header>
      <Navbar.Brand>Issue Tracker</Navbar.Brand>
    </Navbar.Header>
    <Nav>
      <LinkContainer to="/issues">
        <NavItem>Issues</NavItem>
      </LinkContainer>
      <LinkContainer to="/reports">
        <NavItem>Reports</NavItem>
      </LinkContainer>
    </Nav>
    
    <Nav pullRight>
      <NavItem>
        <Glyphicon glyph="plus" />
        Create Issue
      </NavItem>
      <NavDropdown 
        id="user-dropdown"
        title={<Glyphicon glyph="option-horizontal" />}
        noCaret
      >
        <MenuItem>LogOut</MenuItem>
      </NavDropdown>
    </Nav>
  </Navbar>
);

export default Header;