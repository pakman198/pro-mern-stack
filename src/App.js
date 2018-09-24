import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import IssueList from './IssueList';
import IssueEdit from './IssueEdit';

const NoMatch = () => <p>Page Not Found.</p>

const RoutedApp = () => (
  <Router>
    <Switch>
      <Route exact path ="/" render={() => <Redirect to="/issues" />} />
      <Route path="/issues/:id" component={IssueEdit} />
      <Route exact path="/issues" component={IssueList} />
    </Switch>
  </Router>
);

// const Public = () => (
//   <div> This is a public page </div>
// );

// const Private = () => (
//   <div> This is a private page </div>
// );

// const Login = () => (
//   <div> Login Page <button>login</button> </div>
// );



// class App extends React.Component {
//   render() {
//     return (
//       <Router>
//         <div style={{width: 1000, margin: '0 auto'}}>
//           <ul>
//             <li><Link to='/public'> Public </Link></li>
//             <li><Link to='/private'> Private </Link></li>
//           </ul>

//           <hr/>

//           <Switch>
//             <Route path='/public' component={Public} />
//             <Route path='/private' component={Private} />
//             <Route render={() => <NoMatch />} />
//           </Switch>
//         </div>
//       </Router>
//     );
//   }
// }


ReactDOM.render(
  <RoutedApp />,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept();
}
