import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import IssueList from './IssueList';
import IssueEdit from './IssueEdit';

const RoutedApp = () => (
  <Router>
    <Switch>
      <Route exact path ="/" render={() => <Redirect to="/issues" />} />
      <Route path="/issues/:id" component={IssueEdit} />
      <Route exact path="/issues" component={IssueList} />
    </Switch>
  </Router>
);

ReactDOM.render(
  <RoutedApp />,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept();
}
