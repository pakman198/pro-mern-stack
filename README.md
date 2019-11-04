# Pro MERN Stack

Full stack Web App Development with Mongo, Express, React and Node.
Vasan Subramanian, 2016

The code here presented is a [JIRA-like](https://www.atlassian.com/software/jira) app using the MERN stack. The original code was modified due to evolution of some of the dependencies.

The application runs local MongoDB but it can easily be changed to use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas?jmp=homepage).

## Tech

Besides the open source projects described on the MERN stack, this app uses several packages to work properly:

* [React Bootstrap](https://react-bootstrap.github.io/) - The most popular front-end framework rebuilt for React.
* [react-router-bootstrap](https://github.com/react-bootstrap/react-router-bootstrap) - Integration between React Router and React-Bootstrap.
* [react-select](https://react-select.com/home) - A flexible and beautiful Select Input control for ReactJS with multiselect, autocomplete, async and creatable support.
* [react-js-pagination](https://github.com/vayser/react-js-pagination) - A ReactJS dumb component to render a pagination.
* [querystringify](https://github.com/unshiftio/querystringify) - simple but powerful query string parser.


## Installation

This app requires [Node.js](https://nodejs.org/) v8+ to run.

* Make a symlink to `bootstrap/dist` inside the `static` folder.
* Create an account in MongoDB Atlas and then create a database and a collection. 
* Change the name of the `.env.example` file to `.env` and replace the values with the ones from your database and collection.

## Available Scripts

### `npm run populate`
This command will generate dummy data on the database.

### `npm run start:server`
Initialize the node server that will work as our API

### `npm run watch`
Initializes the react app

## Todos

 - Check if I still need to run `init.mongo.js` to generate the indexes
 - Server Side Render
