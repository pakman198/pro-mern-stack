import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Button, Glyphicon, Table, Panel } from 'react-bootstrap';
import Pagination from "react-js-pagination";
import qs from 'querystringify';

import IssueFilter from './IssueFilter';
import Toast from './Toast';

const PAGE_SIZE = 10;

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
  static dataFetcher(location) {
    const query = qs.parse(location.search);
    const pageStr = query._page;
    if(pageStr) {
      delete query._page;
      query._offset = (parseInt(pageStr, 10) - 1) * PAGE_SIZE;
    }
    query._limit = PAGE_SIZE;
    const search = qs.stringify(query);
    
    return fetch(`/api/issues?${search}`).then(response => {
      if(!response.ok) {
        return response.json().then(err => Promise.reject(err));
      } 

      return response.json().then(data => ({ IssueList: data }));
    })
  }

  constructor() {
    super();
    const data = {
      metadata: { totalCount: 0 },
      records: []
    }
    const issues = data.records;
    issues.forEach(issue => {
      issue.created = new Date(issue.created);
      if (issue.completionDate) {
        issue.completionDate = new Date(issue.completionDate);
      }
    });
    this.state = {
      issues,
      isToastVisbile: false,
      toastMessage: '',
      toastType: 'success',
      totalCount: data.metadata.totalCount,
    }
    this.setFilter = this.setFilter.bind(this);
    this.deleteIssue = this.deleteIssue.bind(this);
    this.showError = this.showError.bind(this);
    this.dismissToast = this.dismissToast.bind(this);
    this.selectPage = this.selectPage.bind(this);
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
    const { history } = this.props;

    history.push(`/issues/?${query}`);
  }

  selectPage(page) {
    const { history, location} = this.props;
    const search = qs.parse(location.search);
    Object.assign(search, { _page: page })
    const query = qs.stringify(search);
    
    history.push(`/issues/?${query}`);
  }
  
  loadData() {
    const {location, location: { search }} = this.props;

    IssueList.dataFetcher(location)
    .then(data => {
      const { metadata: { totalCount }} = data.IssueList;
      const issues = data.IssueList.records;

      issues.forEach(issue => {
        issue.created = new Date(issue.created);
        if (issue.completionDate) {
          issue.completionDate = new Date(issue.completionDate);
        }
      });

      this.setState({ issues, totalCount });

    }).catch(err => {
      this.showError('Error in fetching data from server:' + err);
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

  renderPagination() {
    const { totalCount } = this.state;
    const { location: { search }} = this.props;
    const query = qs.parse(search);
    const items = Math.ceil(totalCount / PAGE_SIZE);
    const activePage = parseInt(query._page || '1', 10);

    return (
      <Pagination
        activePage={activePage}
        totalItemsCount={totalCount}
        pageRangeDisplayed={10}
        onChange={this.selectPage}
      />
    )
    
  }
  
  render() {
    const { issues, isToastVisbile, toastMessage, toastType } = this.state;
    const { location: { search }} = this.props;
    const query = qs.parse(search);
    const pagination = this.renderPagination();

    return (
      <div className="issueList">
        <Panel>
          <Panel.Heading>
            <Panel.Title toggle>Filter</Panel.Title>
          </Panel.Heading>
          <Panel.Collapse>
            <Panel.Body>
              <IssueFilter setFilter={this.setFilter} initFilter={query} />
            </Panel.Body>
          </Panel.Collapse>
        </Panel>
        <div className="text-center">
          { pagination }
        </div>
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
