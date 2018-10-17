import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import {
  NavItem,
  Glyphicon,
  Modal,
  Form,
  FormGroup,
  FormControl,
  ControlLabel,
  Button,
  ButtonToolbar
} from 'react-bootstrap';

import Toast from './Toast';

class IssueAddNavItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showing: false,
      isToastVisible: false,
      toastMessage: '',
      toastType: 'success'
    }

    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.submit = this.submit.bind(this);
    this.showError = this.showError.bind(this);
    this.dismissToast = this.dismissToast.bind(this);
  }

  showModal() {
    this.setState({
      showing: true
    });
  }

  hideModal() {
    this.setState({
      showing: false
    });
  }

  showError(message) {
    this.setState({
      isToastVisible: true,
      toastMessage: message,
      toastType: 'danger'
    });
  }

  dismissToast() {
    this.setState({
      isToastVisible: false
    });
  }

  submit(e) {
    e.preventDefault();
    this.hideModal();
    const { issueAdd: { owner, title }} = document.forms;
    const newIssue = {
      owner: owner.value,
      title: title.value,
      status: 'New',
      created: new Date()
    }

    fetch('/api/issues', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newIssue)
    }).then(response => {
      if(response.ok) {
        response.json().then(updatedIssue => {
          const { history } = this.props;
          history.push(`/issues/${updatedIssue._id}`);
        });
      } else {
        response.json().then(err => {
          this.showError(`Failed to add issue ${err.message}`);
        });
      }
    }).catch(err => {
      this.showError(`Error in sending data to server: ${err.message}`);
    });
  }

  render() {
    const { showing, isToastVisible, toastMessage, toastType } = this.state;
    return (
      <React.Fragment>
        <NavItem onClick={this.showModal}>
          <Glyphicon glyph="plus" /> Create Issue
        </NavItem>
        <Modal keyboard show={showing} onHide={this.hideModal}>
          <Modal.Header closeButton>
            <Modal.Title>Create Issue</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form name="issueAdd">
              <FormGroup>
                <ControlLabel>Title</ControlLabel>
                <FormControl type="text" name="title" autoFocus />
              </FormGroup>
              <FormGroup>
                <ControlLabel>Owner</ControlLabel>
                <FormControl type ="text" name="owner" />
              </FormGroup>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <ButtonToolbar>
              <Button type="button" bsStyle="primary" onClick={this.submit}>Submit</Button>
              <Button bsStyle="link" onClick={this.hideModal}>Cancel</Button>
            </ButtonToolbar>
          </Modal.Footer>
        </Modal>
        <Toast
          showing={isToastVisible}
          message={toastMessage}
          onDismiss={this.dismissToast}
          bsStyle={toastType}
        />
      </React.Fragment>
    );
  }
}

IssueAddNavItem.propTypes = {
  router: PropTypes.object // eslint-disable-line react/forbid-prop-types
}

export default withRouter(IssueAddNavItem);