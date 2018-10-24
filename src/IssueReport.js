import React from 'react';
import PropTypes from 'prop-types';
import { Panel, Table } from 'react-bootstrap';

import IssueFilter from  './IssueFilter';
import Toast from './Toast';

const statuses = ['New', 'Open', 'Assigned', 'Fixed', 'Verified', 'Closed'];

const StatRow = (props) => {
  const { owner, counts} = props;
  return (
    <tr>
      <td>{owner}</td>
      {
        statuses.map((status, index) => {
          return <td key={index}>{counts[status]}</td>
        })
      }
    </tr>
  );
} 

StatRow.propTypes = {
  owner: PropTypes.string.isRequired,
  counts: PropTypes.object.isRequired // eslint-disable-line react/forbid-prop-types
}

class IssueReport extends React.Component {
  static dataFetcher(location) {
    const search = location.search ? `${location.search}&_summary` : '?_summary';

    return fetch(`/api/issues${search}`).then(response =>{
      if(!response.ok) {
        return response.json().then(err => Promise.reject(err));
      } else {
        return response.json().then(data => ({ IssueReport: data }));
      }
    })
  }

  constructor(props) {
    super(props);
    this.state = {
      stats: {},
      isToastVisible: false,
      toastMessage: '',
      toastType: 'success'
    }

    this.setFilter = this.setFilter.bind(this);
    this.showError = this.showError.bind(this);
    this.dismissToast = this.dismissToast.bind(this);
  }

  componentDidMount() {
    console.log(this.props);
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
    const { history, location } = this.props;
    history.push({ pathname: location.pathname, search: query });
  }

  showError(message) {
    this.setState({
      isToastVisible: true,
      toastMessage: message,
      toastType: 'danger'
    });
  }

  dismissToast() {
    this.setState({ isToastVisible: true });
  }

  loadData() {
    const { location } = this.props;
    IssueReport.dataFetcher(location)
    .then(data => {
      this.setState({ stats: data.IssueReport });
    }).catch(err => {
      this.showError(`Error in fetching data from the server: ${err}`);
    });
  }

  render() {
    const { stats, isToastVisible, toastMessage, toastType } = this.state;
    const { location: { search }} = this.props;
    const status = statuses.map((status, index) => <td key={index}>{status}</td>);
    const rows = Object.keys(stats).map((owner, index) => {
      return <StatRow key={index} owner={owner} counts={stats[owner]} />
    });

    console.log({stats})

    return (
      <div>
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
        <Table bordered condensed hover responsive>
          <thead>
            <tr>
              <th />
              { status }
            </tr>
          </thead>
          <tbody>
            { rows }
          </tbody>
        </Table>
        <Toast 
          showing={isToastVisible}
          message={toastMessage}
          onDismiss={this.dismissToast}
          bsStyle={toastType}
        />
      </div>
    );
  }
}

IssueReport.propTypes = {
  location: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  history: PropTypes.object // eslint-disable-line react/forbid-prop-types
}

IssueReport.defaultProps = {
  location: {},
  history: {}
}

export default IssueReport;

