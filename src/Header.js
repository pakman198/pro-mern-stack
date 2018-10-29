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
import PropTypes from 'prop-types';

import IssueAddNavItem from './IssueAddNavItem';
import withToast from './withToast';

const Header = (props) => (
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
      <IssueAddNavItem showError={props.showError} />
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

Header.propTypes = {
  showError: PropTypes.func.isRequired,
}

const HeaderWithToast = withToast(Header);

export default HeaderWithToast;