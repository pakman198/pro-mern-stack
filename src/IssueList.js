import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Button, Glyphicon, Table, Panel } from 'react-bootstrap';

import IssueFilter from './IssueFilter';
import Toast from './Toast';

const IssueRow = (props) => {
  function onDeleteClick() {
    const { deleteIssue, issue: { _id }} = props;
    deleteIssue(_id);
  }
  
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
      <td>
        <Button bsSize="xsmall" onClick={onDeleteClick}>
          <Glyphicon glyph="trash" />
        </Button>
      </td>
    </tr>
  );
}

IssueRow.propTypes = {
  issue: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  deleteIssue: PropTypes.func.isRequired
}
    
const IssueTable = (props) => {
  const { issues, deleteIssue } = props;
  const issueRows = issues.map(issue => 
    <IssueRow key={issue._id} issue={issue} deleteIssue={deleteIssue} />
  );
  
  return (
    <Table bordered condensed hover responsive>
      <thead>
        <tr>
          <th>Id</th>
          <th>Status</th>
          <th>Owner</th>
          <th>Created</th>
          <th>Effort</th>
          <th>Completion Date</th>
          <th>Title</th>
          <th>&nbsp;</th>
        </tr>
      </thead>
      <tbody>{ issueRows }</tbody>
    </Table>
  );
}

IssueTable.propTypes = {
  issues: PropTypes.arrayOf(PropTypes.object),
  deleteIssue: PropTypes.func.isRequired
}

IssueTable.defaultProps = {
  issues: []
}
        
class IssueList extends React.Component {
  constructor() {
    super();
    this.state = {
      issues: [],
      isToastVisbile: false,
      toastMessage: '',
      toastType: 'success'
    }
    this.setFilter = this.setFilter.bind(this);
    this.deleteIssue = this.deleteIssue.bind(this);
    this.showError = this.showError.bind(this);
    this.dismissToast = this.dismissToast.bind(this);
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
          this.showError('Failed to fetch issues: ' + err.message);
        });
      }
    })
    .catch(err => {
      this.showError('Error in fetching data from server:', err);
    });
  }

  deleteIssue(id) {
    fetch(`/api/issues/${id}`, { method: 'DELETE'})
    .then(response => {
      if(!response.ok) {
        alert('Failed to delete issue');
      } else {
        this.loadData();
      }
    });
  }

  showError(message) {
    this.setState({
      isToastVisbile: true,
      toastMessage: message,
      toastType: 'danger'
    });
  }

  dismissToast() {
    this.setState({
      isToastVisbile: false
    })
  }
  
  render() {
    const { issues, isToastVisbile, toastMessage, toastType } = this.state;
    const { location: { search }} = this.props;

    return (
      <div className="issueList">
        <Panel>
          <Panel.Heading>
            <Panel.Title toggle>Filter</Panel.Title>
          </Panel.Heading>
          <Panel.Collapse>
            <Panel.Body>
              <IssueFilter setFilter={this.setFilter} initFilter={search} />
            </Panel.Body>
          </Panel.Collapse>
        </Panel>
        <hr />
        <IssueTable issues={issues} deleteIssue={this.deleteIssue} />
        <Toast 
          showing={isToastVisbile}
          message={toastMessage}
          onDismiss={this.dismissToast}
          bsStyle={toastType} 
        />
      </div>
    );
  }
}

IssueList.propTypes = {
  location: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  history: PropTypes.object // eslint-disable-line react/forbid-prop-types
}

IssueList.defaultProps = {
  location: {},
  history: {}
}
  
export default IssueList;
