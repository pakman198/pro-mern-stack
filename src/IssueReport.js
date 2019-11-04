import React from 'react';
import PropTypes from 'prop-types';
import { Accordion, Card, Table, Button } from 'react-bootstrap';
import qs from 'querystringify';

import IssueFilter from  './IssueFilter';
import withToast from './withToast';

const statuses = ['New', 'Open', 'Assigned', 'Fixed', 'Verified', 'Closed'];

const StatRow = (props) => {
  const { owner, counts} = props;
  return (
    <tr>
      <th>{owner}</th>
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
    }

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
    const { history, location } = this.props;
    history.push({ pathname: location.pathname, search: query });
  }

  loadData() {
    const { location, showError } = this.props;
    IssueReport.dataFetcher(location)
    .then(data => {
      this.setState({ stats: data.IssueReport });
    }).catch(err => {
      showError(`Error in fetching data from the server: ${err}`);
    });
  }

  render() {
    const { stats, isToastVisible, toastMessage, toastType } = this.state;
    const { location: { search }} = this.props;
    const status = statuses.map((status, index) => <th key={index}>{status}</th>);
    const rows = Object.keys(stats).map((owner, index) => {
      return <StatRow key={index} owner={owner} counts={stats[owner]} />
    });

    console.log({stats})

    return (
      <div>
        {/* <Panel>
          <Panel.Heading>
            <Panel.Title toggle>Filter</Panel.Title>
          </Panel.Heading>
          <Panel.Collapse>
            <Panel.Body>
              <IssueFilter setFilter={this.setFilter} initFilter={qs.parse(search)} />
            </Panel.Body>
          </Panel.Collapse>
        </Panel> */}

        <Accordion>
          <Card>
            <Card.Header style={{ marginBottom: 0}}>
              <Accordion.Toggle as={Button} variant="link" eventKey="0">
                Filter
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="0">
              <Card.Body style={{ borderBottom: "1px solid rgba(0,0,0,.125)"}}>
                <IssueFilter setFilter={this.setFilter} initFilter={qs.parse(search)} />
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>

        <br/>

        <Table bordered hover responsive>
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
      </div>
    );
  }
}

IssueReport.propTypes = {
  location: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  history: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  showError: PropTypes.func.isRequired,
}

IssueReport.defaultProps = {
  location: {},
  history: {}
}

const IssueReportWithToast = withToast(IssueReport);
IssueReportWithToast.dataFetcher = IssueReport.dataFetcher;

export default IssueReportWithToast;

