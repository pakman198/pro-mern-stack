import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import {
  Modal,
  Form,
  FormGroup,
  FormControl,
  FormLabel,
  Button,
  ButtonToolbar
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

class IssueAddNavItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showing: false,
    }

    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.submit = this.submit.bind(this);
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

  submit(e) {
    e.preventDefault();
    this.hideModal();
    const { issueAdd: { owner, title }} = document.forms;
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
          this.props.showError(`Failed to add issue ${err.message}`);
        });
      }
    }).catch(err => {
      this.props.showError(`Error in sending data to server: ${err.message}`);
    });
  }

  render() {
    const { showing } = this.state;
    return (
      <React.Fragment>
        <Button variant="outline-success" onClick={this.showModal}>
          <FontAwesomeIcon icon={faPlus} />
          &nbsp;Create Issue
        </Button>
        <Modal keyboard show={showing} onHide={this.hideModal}>
          <Modal.Header closeButton>
            <Modal.Title>Create Issue</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form name="issueAdd">
              <FormGroup>
                <FormLabel>Title</FormLabel>
                <FormControl type="text" name="title" autoFocus />
              </FormGroup>
              <FormGroup>
                <FormLabel>Owner</FormLabel>
                <FormControl type="text" name="owner" />
              </FormGroup>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <ButtonToolbar>
              <Button variant="primary" className="mr-2" onClick={this.submit}>Submit</Button>
              <Button variant="danger" onClick={this.hideModal}>Cancel</Button>
            </ButtonToolbar>
          </Modal.Footer>
        </Modal>
      </React.Fragment>
    );
  }
}

IssueAddNavItem.propTypes = {
  history: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  showError: PropTypes.func.isRequired,
}

IssueAddNavItem.defaultProps = {
  history: {}
}

export default withRouter(IssueAddNavItem);