import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import IssueAdd from './IssueAdd';
import IssueFilter from './IssueFilter';

const IssueRow = (props) => {
  const {
    issue: {
      _id,
      status,
      owner,
      created,
      effort,
      completionDate,
      title,
    },
  } = props;
    
  return (
    <tr>
      <td>
        <Link to={`/issues/${_id}`}>{_id.substr(-4)}</Link>
      </td>
      <td>{ status }</td>
      <td>{ owner }</td>
      <td>{ created.toUTCString().slice(0, -13) }</td>
      <td>{ effort }</td>
      <td>{ completionDate ? completionDate.toUTCString().slice(0, -13) : '' }</td>
      <td>{ title }</td>
    </tr>
  );
}

IssueRow.propTypes = {
  issue: PropTypes.objectOf(PropTypes.object)
}

IssueRow.defaultProps = {
  issue: {}
}
    
const IssueTable = (props) => {
  const { issues } = props;
  const issueRows = issues.map(issue => <IssueRow key={issue._id} issue={issue} />);
  
  return (
    <table className="bordered-table">
      <thead>
        <tr>
          <th>Id</th>
          <th>Status</th>
          <th>Owner</th>
          <th>Created</th>
          <th>Effort</th>
          <th>Completion Date</th>
          <th>Title</th>
        </tr>
      </thead>
      <tbody>{ issueRows }</tbody>
    </table>
  );
}

IssueTable.propTypes = {
  issues: PropTypes.arrayOf(PropTypes.object)
}

IssueTable.defaultProps = {
  issues: []
}
        
class IssueList extends React.Component {
  constructor() {
    super();
    this.state = { issues: [] }
    this.createIssue = this.createIssue.bind(this);
    this.setFilter = this.setFilter.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate(prevProps) {
    const { location: { search }} = this.props;
    const oldQuery = prevProps.location.search;
    const newQuery = search;

    if (oldQuery === newQuery) return;

    this.loadData();
  }

  setFilter(query) {
    const { history: { push }, location: { pathname }} = this.props;
    push({ pathname, search: query });
  }
  
  loadData() {
    const {location: { search }} = this.props;
    
    fetch(`/api/issues${search}`)
    .then(response => {
      if (response.ok) {
        response.json().then(data => {
          const {records, _metadata: {total_count}} = data;
          
          console.log(`Total count of records: ${total_count}`); // eslint-disable-inline
          
          records.forEach((record) => {
            record.created = new Date(record.created);
            if (record.completionDate) {
              record.completionDate = new Date(record.completionDate);
            }
          });
          
          this.setState({ issues: records });
        });
      } else {
        response.json().then(err => {
          alert('Failed to fetch issues: ' + err.message);
        });
      }
    })
    .catch(err => {
      alert('Error in fetching data from server:', err);
    });
  }

  createIssue(newIssue) {
    fetch('/api/issues', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newIssue)
      
    }).then( response => {
      if(response.ok){
        response.json().then(updatedIssue => {
          updatedIssue.created = new Date(updatedIssue.created);
          if(updatedIssue.completionDate) {
            updatedIssue.completionDate = new Date(updatedIssue.completionDate);
          }
          const { issues } = this.state;
          const newIssues = issues.concat(updatedIssue);
          this.setState({ issues: newIssues });
        })
        
      } else {
        response.json().then(err => {
          alert(`Failed to add issue: ${err.message}`);
        });
      }
    })
    .catch(err => {
      console.log(`Error in sending data to the server: ${err.message}`) // eslint-disable-inline
    });
  }
  
  render() {
    const { issues } = this.state;
    const { location: { query }} = this.props;

    return (
      <div className="issueList">
        <IssueFilter setFilter={this.setFilter} initFilter={query} />
        <hr />
        <IssueTable issues={issues} />
        <hr />
        <IssueAdd createIssue={this.createIssue} />
      </div>
    );
  }
}

IssueList.propTypes = {
  location: PropTypes.objectOf(PropTypes.object),
  history: PropTypes.objectOf(PropTypes.object)
}

IssueList.defaultProps = {
  location: {},
  history: {}
}
  
export default IssueList;
