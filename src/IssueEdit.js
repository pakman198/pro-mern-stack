import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

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
        created: ''
      },
      invalidFields: {}
    }

    this.onChange = this.onChange.bind(this);
    this.onValidityChange = this.onValidityChange.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate(prevProps) {
    const { params: { id }} = this.props.match;

    if (prevProps.match.params.id !== id) this.loadData();
  }

  onChange(e, convertedValue) {
    const { target: { name, value }} = e;
    const issue = Object.assign({}, this.state.issue);
    const val = convertedValue !== undefined ? convertedValue : value; 
    issue[name] = val;

    this.setState({ issue });
  }

  onValidityChange(e, valid) {
    const { invalidFields } = this.state;
    const { name } = e.target;
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

  loadData() {
    const { params: { id }} = this.props.match;
    fetch(`/api/issues/${id}`)
      .then(response => {
        if (response.ok) {
          response.json().then(issue => {
            issue.created = new Date(issue.created).toUTCString().slice(0, -13);
            issue.completionDate = issue.completionDate !== undefined 
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
      <div>
        <form>
          ID: { issue._id }
          <br/>
          Created: { issue.created }
          <br/>
          Status:
          <select 
            name="status" 
            value={issue.status} 
            onChange={this.onChange}>
              <option value="New">New</option>
              <option value="Open">Open</option>
              <option value="Assigned">Assigned</option>
              <option value="Fixed">Fixed</option>
              <option value="Verified">Verified</option>
              <option value="Closed">Closed</option>
          </select>
          <br/>
          Owner: 
          <input name="owner" value={issue.owner} onChange={this.onChange} />
          <br/>
          Effort:
          <NumInput size={5} name="effort" value={issue.effort} onChange={this.onChange} />
          <br/>
          Completion Date:
          <DateInput 
            name="completionDate" 
            value={completionDate} 
            onChange={this.onChange}
            onValidityChange={this.onValidityChange} />
          <br/>
          Title:
          <input name="title" size={50} value={issue.title} onChange={this.onChange} />
          <br/>
          {validationMessage}
          <button type="submit">Submit</button>
        </form>
        <br/>
        <Link to="/issues">Back to issue List</Link>
      </div>
    )
  } 
}

IssueEdit.propTypes = {
  match: PropTypes.objectOf(PropTypes.object)
}

IssueEdit.defaultProps = {
  match: {},
};

export default IssueEdit;