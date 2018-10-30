# Pro MERN Stack

Full stack Web App Development with Mongo, Express, React and Node.
Vasan Subramanian, 2016

The code here presented is a [JIRA-like](https://www.atlassian.com/software/jira) app using the MERN stack. The original code was modified due to evolution of some of the dependencies.

The application runs local MongoDB but it can easily be changed to use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas?jmp=homepage).

### Tech

Besides the open source projects described on the MERN stack, this app uses several packages to work properly:

* [React Bootstrap](https://react-bootstrap.github.io/) - The most popular front-end framework rebuilt for React.
* [react-router-bootstrap](https://github.com/react-bootstrap/react-router-bootstrap) - Integration between React Router and React-Bootstrap.
* [react-select](https://react-select.com/home) - A flexible and beautiful Select Input control for ReactJS with multiselect, autocomplete, async and creatable support.
* [react-js-pagination](https://github.com/vayser/react-js-pagination) - A ReactJS dumb component to render a pagination.
* [querystringify](https://github.com/unshiftio/querystringify) - simple but powerful query string parser.


### Installation

This app requires [Node.js](https://nodejs.org/) v8+ to run.

You need to install mongo on your computer, create a database and fill it with some data. For simplicity, we will use 2 scripts:
```
mongod // to initialize the mongo server
$ cd scripts
$ mongo init.mongo.js
$ mongo generate_data.mongo.js
```

Install the dependencies and devDependencies and start the application.

```sh
$ npm install
$ npm run dev-all
```

### Todos

 - Server Side Render
