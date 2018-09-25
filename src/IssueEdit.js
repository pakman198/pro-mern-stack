import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class IssueEdit extends React.Component { //eslint-disable-line
  render() {
    const { match: { params: { id }}} = this.props;
    return (
      <div>
        <p>{`This is a placeholder for editing issue ${id}.`}</p>
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