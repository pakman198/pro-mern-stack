import React from 'react';
import PropTypes from 'prop-types';
import {
  Col,
  Row,
  FormGroup,
  FormControl,
  ControlLabel,
  InputGroup,
  ButtonToolbar,
  Button
} from 'react-bootstrap';
import qs from 'querystringify';

class IssueFilter extends React.Component {
  constructor(props){
    super(props);
    const { initFilter: { status, effort_gte, effort_lte }} = props;
    this.state = {
      status: status || '',
      effort_gte: effort_gte || '',
      effort_lte: effort_lte || '',
      changed: false
    }

    this.handleStatusChange = this.handleStatusChange.bind(this);
    this.handleEffortGteChange = this.handleEffortGteChange.bind(this);
    this.handleEffortLteChange = this.handleEffortLteChange.bind(this);
    this.applyFilter = this.applyFilter.bind(this);
    this.resetFilter = this.resetFilter.bind(this);
    this.clearFilter = this.clearFilter.bind(this);
  }

  componentWillReceiveProps(newProps) {
    const { initFilter: { status, effort_gte, effort_lte }} = newProps;
    this.setState({
      status: status || '',
      effort_gte: effort_gte || '',
      effort_lte: effort_lte || '',
      changed: false
    });
  }

  handleStatusChange(e) {
    const { value } = e.target;

    this.setState({
      status: value,
      changed: true
    });
  }

  handleEffortGteChange(e) {
    const { value } = e.target;

    if (value.match(/^\d*$/)) {
      this.setState({
        effort_gte: value,
        changed: true
      });
    }
  }

  handleEffortLteChange(e) {
    const { value } = e.target;

    if (value.match(/^\d*$/)) {
      this.setState({
        effort_lte: value,
        changed: true
      });
    }
  }

  applyFilter() {
    const newFilter = {};
    const { status, effort_gte, effort_lte } = this.state;
    const { setFilter } = this.props;

    if (status) newFilter.status = status;
    if (effort_gte) newFilter.effort_gte = effort_gte;
    if (effort_lte) newFilter.effort_lte = effort_lte;

    const query = qs.stringify(newFilter);

    setFilter(query);
  }

  resetFilter() {
    const { initFilter: { status, effort_gte, effort_lte }} = this.props;

    this.setState({
      status: status || '',
      effort_gte: effort_gte || '',
      effort_lte: effort_lte || '',
      changed: false
    });
  }

  clearFilter() {
    const { setFilter } = this.props;
    
    setFilter("");
  }

  renderSelect() {
    const { status } = this.state;

    return (
      <FormGroup>
        <ControlLabel>Status</ControlLabel>
        <FormControl
          componentClass="select"
          value={status}
          onChange={this.handleStatusChange}
        >
          <option value="">(Any)</option>
          <option value="New">New</option>
          <option value="Open">Open</option>
          <option value="Assigned">Assigned</option>
          <option value="Fixed">Fixed</option>
          <option value="Verified">Verified</option>
          <option value="Closed">Closed</option>
        </FormControl>
      </FormGroup>
    );
  }

  render() {
    const { effort_gte, effort_lte, changed } = this.state;
    const status = this.renderSelect();
    return (
      <Row>
        <Col xs={6} sm={4} md={3}>
          { status }
        </Col>

        <Col xs={6} sm={4} md={3}>
          <FormGroup>
            <ControlLabel>Effort</ControlLabel>
            <InputGroup>
              <FormControl value={effort_gte} onChange={this.handleEffortGteChange} />
              <InputGroup.Addon>-</InputGroup.Addon>
              <FormControl value={effort_lte} onChange={this.handleEffortLteChange} />
            </InputGroup>
          </FormGroup>
        </Col>

        <Col xs={12} sm={4} md={3}>
          <FormGroup>
            <ControlLabel>&nbsp;</ControlLabel>
            <ButtonToolbar>
              <Button bsStyle="primary" onClick={this.applyFilter}>Apply</Button>
              <Button onClick={this.resetFilter} disabled={!changed}>Reset</Button>
              <Button onClick={this.clearFilter}>Clear</Button>
            </ButtonToolbar>
          </FormGroup>
        </Col>
      </Row>
    );
  }
}

IssueFilter.propTypes = {
  initFilter: PropTypes.oneOfType([
    PropTypes.object, 
    PropTypes.string]).isRequired, // eslint-disable-line react/forbid-prop-types
  setFilter: PropTypes.func.isRequired
}

export default IssueFilter;