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
  Col
} from 'react-bootstrap';

import NumInput from './NumInput';
import DateInput from './DateInput';

class IssueEdit extends React.Component {
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
      invalidFields: {}
    }

    this.onChange = this.onChange.bind(this);
    this.onValidityChange = this.onValidityChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
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
    const { state_issue } = this.state;
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
      return;
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

          alert('Updated issue successfully.');
        });
      } else {
        response.json().then(err => {
          alert(`Failed to updated issue: ${err.message}`);
        });
      }
    })
    .catch(err => {
      alert(`Error in sending data to the server: ${err.message}`);
    });
  }

  loadData() {
    const { match: {params: { id }}} = this.props;
    fetch(`/api/issues/${id}`)
      .then(response => {
        if (response.ok) {
          response.json().then(issue => {
            issue.created = new Date(issue.created).toUTCString().slice(0, -13);
            issue.completionDate = issue.completionDate !== undefined && issue.completionDate !== null
              ? new Date(issue.completionDate) : null;

            this.setState({ issue });
          });
        } else {
          response.json().then(err => {
            alert(`Failed to fetch issue: ${err.message}`)
          });
        }
      }).catch(err => {
        alert(`Error in fetching data from server: ${err.message}`);
      });
  }

  message() {
    return (
      <div className="error">
        Please correct invalid fields before submitting.
      </div>
    )
  }

  render() {
    const { issue, invalidFields } = this.state;
    const validationMessage = Object.keys(invalidFields).length === 0 
      ? null : this.message();
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
                  onChange={this.onChange} />
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
                  onValidityChange={this.onValidityChange} />
                <FormControl.Feedback />
              </Col>
            </FormGroup>

            <FormGroup>
              <Col componentClass={ControlLabel} sm={3}>Title</Col>
              <Col sm={9}>
                <FormControl name="owner" value={issue.title} onChange={this.onChange} />
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
          </Form>
          { validationMessage }
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