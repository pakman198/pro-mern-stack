import React from 'react';
import PropTypes from 'prop-types';
import { LinkContainer } from 'react-router-bootstrap';
import {
  FormGroup,
  FormControl,
  ControlLabel,
  ButtonToolbar,
  Button,
  Panel,
  Form,
  Col,
  Alert
} from 'react-bootstrap';

import NumInput from './NumInput';
import DateInput from './DateInput';
import Toast from './Toast';

class IssueEdit extends React.Component {
  static dataFetcher(id) {
    return fetch(`/api/issues/${id}`).then(response => {
      if(!response.ok) {
        return response.json().then(err => Promise.reject(err));
      } 

      return response.json().then(data => ({ IssueEdit: data }));
    })
  }

  constructor() {
    super();
    this.state = {
      issue: {
        _id: '',
        title: '',
        status: '',
        owner: '',
        effort: null,
        completionDate: null,
        created: null
      },
      invalidFields: {},
      isValidationVisible: false,
      isToastVisible: false,
      toastMessage: '',
      toastType: 'success'
    }

    this.onChange = this.onChange.bind(this);
    this.onValidityChange = this.onValidityChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.dismissValidation = this.dismissValidation.bind(this);
    this.showValidation = this.showValidation.bind(this);
    this.showSuccess = this.showSuccess.bind(this);
    this.showError = this.showError.bind(this);
    this.dismissToast = this.dismissToast.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate(prevProps) {
    const { match: {params: { id }}} = this.props;

    if (prevProps.match.params.id !== id) this.loadData();
  }

  onChange(e, convertedValue) {
    const { target: { name, value }} = e;
    const { issue:  state_issue } = this.state;
    const issue = Object.assign({}, state_issue);
    const val = convertedValue !== undefined ? convertedValue : value; 
    issue[name] = val;

    this.setState({ issue });
  }

  onValidityChange(e, valid) {
    const { invalidFields } = this.state;
    const { name } = e.target;
    const invalid_fields = Object.assign({}, invalidFields);

    if(!valid) {
      invalid_fields[name] = true;
    } else {
      delete invalid_fields[name];
      this.dismissValidation();
    }

    this.setState({
      invalidFields: invalid_fields
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const { invalidFields, issue } = this.state;
    const { match: {params: { id }}} = this.props;

    if( Object.keys(invalidFields).length !== 0) {
      this.showValidation();
      return;
    } else {
      this.dismissValidation();
    }

    fetch(`/api/issues/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify(issue)
    })
    .then(response => {
      if(response.ok) {
        response.json().then(updatedIssue => {
          updatedIssue.created = new Date(updatedIssue.created).toUTCString().slice(0, -13);
          
          if(updatedIssue.completionDate) {
            updatedIssue.completionDate = new Date(updatedIssue.completionDate);
          }

          console.log({updatedIssue});

          this.setState({
            issue: updatedIssue
          });

          this.showSuccess('Updated issue successfully.');
        });
      } else {
        response.json().then(err => {
          this.showError(`Failed to updated issue: ${err.message}`);
        });
      }
    })
    .catch(err => {
      this.showError(`Error in sending data to the server: ${err.message}`);
    });
  }

  loadData() {
    const { match: {params: { id }}} = this.props;
    IssueEdit.dataFetcher(id)
    .then(data => {
      const issue = data.IssueEdit;
      issue.created = new Date(issue.created).toUTCString().slice(0, -13);
      issue.completionDate = issue.completionDate !== undefined && issue.completionDate !== null
        ? new Date(issue.completionDate) : null;

      this.setState({ issue });

    }).catch(err => {
      this.showError(`Error in fetching data from server: ${err.message}`);
    });
}

showValidation() {
  this.setState({
    isValidationVisible: true
  });
  }

  dismissValidation() {
    this.setState({
      isValidationVisible: false
    });
  }
  
  showSuccess(message) {
    this.setState({
      isToastVisible: true,
      toastMessage: message,
      toastType: 'success'
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

  message() {
    return (
      <Alert bsStyle="danger" onDismiss={this.dismissValidation}>
        Please correct invalid fields before submitting.
      </Alert>
    )
  }

  render() {
    const { 
      issue,
      invalidFields,
      isValidationVisible,
      isToastVisible,
      toastMessage,
      toastType 
    } = this.state;
    const validationMessage = Object.keys(invalidFields).length === 0
      && !isValidationVisible ? null : this.message();
    const completionDate = issue.completionDate 
      ? issue.completionDate.toISOString().substr(0, 10) : null;

    return (
      <Panel>
        <Panel.Heading>
          <Panel.Title>Edit Issue</Panel.Title>
        </Panel.Heading>
        <Panel.Body>
          <Form horizontal onSubmit={this.onSubmit}>
            <FormGroup>
              <Col componentClass={ControlLabel} sm={3}>ID</Col>
              <Col sm={9}>
                <FormControl.Static>{ issue._id }</FormControl.Static>
              </Col>
            </FormGroup>
            
            <FormGroup>
              <Col componentClass={ControlLabel} sm={3}>Created</Col>
              <Col sm={9}>
                <FormControl.Static>{ issue.created }</FormControl.Static>
              </Col>
            </FormGroup>

            <FormGroup>
              <Col componentClass={ControlLabel} sm={3}>Status</Col>
              <Col sm={9}>
                <FormControl
                  componentClass="select"
                  name="status"
                  value={issue.status}
                  onChange={this.onChange}
                >
                  <option value="New">New</option>
                  <option value="Open">Open</option>
                  <option value="Assigned">Assigned</option>
                  <option value="Fixed">Fixed</option>
                  <option value="Verified">Verified</option>
                  <option value="Closed">Closed</option>
                </FormControl>
              </Col>
            </FormGroup>

            <FormGroup>
              <Col componentClass={ControlLabel} sm={3}>Owner</Col>
              <Col sm={9}>
                <FormControl name="owner" value={issue.owner} onChange={this.onChange} />
              </Col>
            </FormGroup>

            <FormGroup>
              <Col componentClass={ControlLabel} sm={3}>Effort</Col>
              <Col sm={9}>
                <FormControl 
                  componentClass={NumInput}
                  name="effort"
                  value={issue.effort}
                  onChange={this.onChange}
                />
              </Col>
            </FormGroup>

            <FormGroup validationState={invalidFields.completionDate ? 'error' : null}>
              <Col componentClass={ControlLabel} sm={3}>Completion Date</Col>
              <Col sm={9}>
                <FormControl 
                  componentClass={DateInput}
                  name="completionDate"
                  value={completionDate} 
                  onChange={this.onChange}
                  onValidityChange={this.onValidityChange}
                />
                <FormControl.Feedback />
              </Col>
            </FormGroup>

            <FormGroup>
              <Col componentClass={ControlLabel} sm={3}>Title</Col>
              <Col sm={9}>
                <FormControl name="title" value={issue.title} onChange={this.onChange} />
              </Col>
            </FormGroup>            

            <FormGroup>
              <Col smOffset={3} sm={6}>
                <ButtonToolbar>
                  <Button bsStyle="primary" type="submit">Submit</Button>
                  <LinkContainer to="/issues">
                    <Button bsStyle="link">Back</Button>
                  </LinkContainer>
                </ButtonToolbar>
              </Col>
            </FormGroup>

            <FormGroup>
              <Col smOffset={3} sm={9}>
                { validationMessage }
              </Col>
            </FormGroup>
          </Form>
          <Toast
            showing={isToastVisible}
            message={toastMessage}
            onDismiss={this.dismissToast}
            bsStyle={toastType}
          />
        </Panel.Body>
      </Panel>
    );
  } 
}

IssueEdit.propTypes = {
  match: PropTypes.object // eslint-disable-line react/forbid-prop-types
}

IssueEdit.defaultProps = {
  match: {},
};

export default IssueEdit;