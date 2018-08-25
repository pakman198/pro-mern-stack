const continents = ['Africa', 'America', 'Asia', 'Australia', 'Europe'];
const message = continents.map(c => `Hello ${c}!`).join(' ');
const component = <p>{message}</p>;

ReactDOM.render(
component,
document.getElementById('root')
);
