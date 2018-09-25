import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, Switch, Redirect, withRouter } from 'react-router-dom';
import createHistory from "history/createHashHistory";

import IssueList from './IssueList';
import IssueEdit from './IssueEdit';

const customHistory = createHistory();

const RoutedApp = () => (
  <Router history={customHistory}>
    <Switch>
      <Route exact path="/" render={() => <Redirect to="/issues" />} />
      <Route path="/issues/:id" component={IssueEdit} />
      <Route exact path="/issues" component={withRouter(IssueList)} />
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
