import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { createBrowserHistory } from "history";

import Header from './Header';
import IssueList from './IssueList';
import IssueEdit from './IssueEdit';
import IssueReport from './IssueReport';

const customHistory = createBrowserHistory();

const App = () => {
  return (
    <Router history={customHistory}>
      <React.Fragment>
        {/* <Header /> */}
        <div className="container-fluid">
          <Switch>
            <Route path="/reports" component={withRouter(IssueReport)} />
            <Route path="/issues/:id" component={withRouter(IssueEdit)} />
            <Route path="/issues" component={withRouter(IssueList)} />
            <Route exact path="/" render={() => <Redirect to="/issues" />} />
            {/* <Route path="*" render={() => <Redirect to="/issues" />} /> */}
          </Switch>
        </div>
        <div className="footer container-fluid">
          <p>
            Full source code available at this&nbsp;
            <a href="https://github.com/pakman198">Github repository</a>
          </p>
        </div>
      </React.Fragment>
    </Router>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept();
}
