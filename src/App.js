import React from 'react';
import ReactDOM from 'react-dom';

import IssueList from './IssueList';

ReactDOM.render(
<IssueList />,
document.getElementById('root')
);

if(module.hot) {
    module.hot.accept();
}
