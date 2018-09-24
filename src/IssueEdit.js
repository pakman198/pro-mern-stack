import React from 'react';

import { Link } from 'react-router-dom';

class IssueEdit extends React.Component { //eslint-disable-line
  render() {
    const { params: { id }} = this.props.match;
    return (
      <div>
        <p>This is a placeholder for editing issue {id}.</p>
        <Link to="/issues">Back to issue List</Link>
      </div>
    )
  } 
}

export default IssueEdit;