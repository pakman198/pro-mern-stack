import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class IssueEdit extends React.Component {
  constructor() {
    super();

    this.state = {
      issue: {
        _id: '',
        title: '',
        status: '',
        owner: '',
        effort: '',
        completionDate: '',
        created: ''
      }
    }

    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate(prevProps) {
    const { params: { id }} = this.props.match;

    if (prevProps.match.params.id !== id) this.loadData();
  }

  onChange(e) {
    const { target: { name, value }} = e;
    const issue = Object.assign({}, this.state.issue);
    issue[name] = value;

    this.setState({ issue });
  }

  loadData() {
    const { params: { id }} = this.props.match;
    fetch(`/api/issues/${id}`)
      .then(response => {
        if (response.ok) {
          response.json().then(issue => {
            console.log({issue})
            issue.created = new Date(issue.created).toDateString();
            issue.completionDate = issue.completionDate !== null ? 
              new Date(issue.completionDate).toDateString() : '';
            issue.effort = issue.effort != null ? issue.effort.toString() : '';

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

  render() {
    const { issue } = this.state;

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
          <input size={5} name="effort" value={issue.effort} onChange={this.onChange} />
          <br/>
          Completion Date:
          <input name="completionDate" value={issue.completionDate} onChange={this.onChange} />
          <br/>
          Title:
          <input name="title" size={50} value={issue.title} onChange={this.onChange} />
          <br/>
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