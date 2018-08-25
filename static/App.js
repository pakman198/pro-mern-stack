'use strict';

var continents = ['Africa', 'America', 'Asia', 'Australia', 'Europe'];
var message = continents.map(function (c) {
  return 'Hello ' + c + '!';
}).join(' ');
var component = React.createElement(
  'p',
  null,
  message
);

ReactDOM.render(component, document.getElementById('root'));