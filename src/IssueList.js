import React from 'react';

import { Link } from 'react-router-dom';

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
        <Link to={ `/issues/${_id}` }>{_id.substr(-4)}</Link>
      </td>
      <td>{ status }</td>
      <td>{ owner }</td>
      <td>{ created.toDateString() }</td>
      <td>{ effort }</td>
      <td>{ completionDate ? completionDate.toDateString() : '' }</td>
      <td>{ title }</td>
    </tr>
  );
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
        
class IssueList extends React.Component {
  constructor() {
    super();
    this.state = { issues: [] }
    this.createIssue = this.createIssue.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate(prevProps) {
    const oldQuery = prevProps.location.search;
    const newQuery = this.props.location.search;

    if (oldQuery === newQuery ) return;

    this.loadData();
  }
  
  loadData() {
    const {location: { search }} = this.props;
    
    fetch(`/api/issues${search}`)
    .then(response => {
      if (response.ok) {
        response.json().then(data => {
          const {records, _metadata: {total_count}} = data;
          
          console.log(`Total count of records: ${total_count}`);
          
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
      console.log(`Error in sending data to the server: ${err.message}`)
    });
  }
  
  render() {
    const { issues } = this.state;

    return (
      <div>
        <h1>TIssue Tracker</h1>
        <IssueFilter />
        <hr />
        <IssueTable issues={issues} />
        <hr />
        <IssueAdd createIssue={this.createIssue} />
      </div>
    );
  }
}
  
export default IssueList;
