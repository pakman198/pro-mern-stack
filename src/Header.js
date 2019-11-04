import React from 'react';
import {
  Navbar,
  Nav,
  NavItem,
  NavDropdown,
  MenuItem,
  Glyphicon,
  Col
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import AsyncSelect from 'react-select/async'

import IssueAddNavItem from './IssueAddNavItem';
import withToast from './withToast';

const Header = (props) => {

  function searchIssues(input) {
    if(input.length < 2) {
      return Promise.resolve([]);
    }

    return fetch(`/api/issues?search=${input}`).then(response => {
      if(!response.ok) {
        return response.json().then(err => Promise.reject(err));
      }

      return response.json().then(data => {
        const options = data.records.map(issue => {
          return {
            value: issue._id,
            label: `${issue._id.substr(-4)}: ${issue.title}`
          };
        });

        return options;
        
      }).catch(err => {
        this.props.showError(`Error fetching data from the server: ${err}`);
      });
    });
  }

  function filterOptions(options) {
    return options;
  }

  function selectIssue(item) {
    const { history } = props;
    if(item) history.push(`/issues/${item.value}`);
  }

  return (
    <Navbar fluid style={{zIndex: 5}}>
      <Col sm={5}>
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
      </Col>
      
      <Col sm={4}>
        <div style={{ paddingTop: 8}}>
          <AsyncSelect
            placeholder="Search&hellip;"
            loadOptions={searchIssues}
            onChange={selectIssue}
          />
        </div>
      </Col>

      <Col sm={3}>
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
      </Col>
    </Navbar>
  );
}

Header.propTypes = {
  showError: PropTypes.func.isRequired,
}

const HeaderWithToast = withToast(Header);

export default withRouter(HeaderWithToast);