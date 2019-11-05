import React from 'react';
import {
  Navbar,
  Nav,
  NavDropdown,
  Col
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faEllipsisH } from '@fortawesome/free-solid-svg-icons'
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
    <Navbar bg="light" className="mb-3" style={{zIndex: 5}}>
      <Col sm={5}>
        <Nav>
          <Navbar.Brand>Issue Tracker</Navbar.Brand>
          <LinkContainer to="/issues">
            <Nav.Link>Issues</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/reports">
            <Nav.Link>Reports</Nav.Link>
          </LinkContainer>
        </Nav>
      </Col>
      
      <Col sm={4}>
        <div>
          <AsyncSelect
            placeholder="Search&hellip;"
            loadOptions={searchIssues}
            onChange={selectIssue}
          />
        </div>
      </Col>

      <Col sm={3}>
        <Nav>
          <IssueAddNavItem showError={props.showError} />
          <NavDropdown 
            className="user-dropdown"
            title={<FontAwesomeIcon icon={faEllipsisH} />}
          >
            <NavDropdown.Item>LogOut</NavDropdown.Item>
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