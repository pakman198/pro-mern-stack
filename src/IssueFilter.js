import React from 'react';

import { Link } from 'react-router-dom';

class IssueFilter extends React.Component { // eslint-disable-inline
  render() {
    const Separator = () => <span> | </span>;

    return (
      <div>
        <Link to="/issues">All Issues</Link>
        <Separator />
        <Link to={{ pathname: "/issues", search: "?status=Open" }}>Open Issues</Link>
        <Separator />
        <Link to="/issues?status=Assigned">Assigned Issues</Link>
      </div>
    );
  }
}

export default IssueFilter;