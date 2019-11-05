import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Button,  Table, Accordion, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import Pagination from "react-js-pagination";
import qs from 'querystringify';

import IssueFilter from './IssueFilter';
import withToast from './withToast';

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
      <td style={{ textAlign: "center" }}>
        <Button size="sm" variant="danger" onClick={onDeleteClick}>
          <FontAwesomeIcon icon={faTrash} />
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
    <Table bordered hover responsive>
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
      totalCount: data.metadata.totalCount,
    }
    this.setFilter = this.setFilter.bind(this);
    this.deleteIssue = this.deleteIssue.bind(this);
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
    const {location, showError} = this.props;

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
      showError('Error in fetching data from server:' + err);
    });
  }

  deleteIssue(id) {
    fetch(`/api/issues/${id}`, { method: 'DELETE'})
    .then(response => {
      if(!response.ok) {
        this.props.showError('Failed to delete issue');
      } else {
        this.loadData();
      }
    });
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
        itemClass="page-item"
        linkClass="page-link"
        style={{ display: "inline-flex", marginBotom: 0 }}
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
        <Accordion>
          <Card>
            <Card.Header style={{ marginBottom: 0}}>
              <Accordion.Toggle as={Button} variant="link" eventKey="0">
                Filter
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="0">
              <Card.Body style={{ borderBottom: "1px solid rgba(0,0,0,.125)"}}>
                <IssueFilter setFilter={this.setFilter} initFilter={query} />
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
        
        <div className="text-center mt-4" >
          { pagination }
        </div>
        <hr />
        <IssueTable issues={issues} deleteIssue={this.deleteIssue} />
      </div>
    );
  }
}

IssueList.propTypes = {
  location: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  history: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  showError: PropTypes.func.isRequired
}

IssueList.defaultProps = {
  location: {},
  history: {}
}

const IssueListWithToast = withToast(IssueList);
IssueListWithToast.dataFetcher = IssueList.dataFetcher;
  
export default IssueListWithToast;
