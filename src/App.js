import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch, Redirect, withRouter } from 'react-router-dom';
import createHistory from "history/createBrowserHistory";

import IssueList from './IssueList';
import IssueEdit from './IssueEdit';

const customHistory = createHistory();

const App = () => {
  return (
    <Router history={customHistory}>
      <React.Fragment>
        <div className="header">
          <h1>Issue Tracker</h1>
        </div>
        <div className="contents">
          <Switch>
            <Route path="/issues/:id" component={withRouter(IssueEdit)} />
            <Route exact path="/issues" component={withRouter(IssueList)} />
            <Route exact path="/" render={() => <Redirect to="/issues" />} />
            <Route path="*" render={() => <Redirect to="/issues" />}></Route>
          </Switch>
        </div>
        <div className="footer">
          <p>
            Full source code available at this <a href="https://github.com/pakman198">Github repository</a>
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
