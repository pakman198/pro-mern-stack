import express from 'express';
import path from 'path';
import  bodyParser from 'body-parser';
import { MongoClient } from 'mongodb';
import SourceMapSupport from 'source-map-support';
import Issue from './issue';
import '@babel/polyfill';

SourceMapSupport.install();

const app = express();

app.use(express.static('static'));
app.set('json spaces', 2); // makes the json response look pretty 
app.use(bodyParser.json());

if(process.env.NODE_ENV !== 'production') {
    const webpack = require('webpack');
    const webpackDevMiddleware = require('webpack-dev-middleware');
    const webpackHotMiddleware = require('webpack-hot-middleware');

    const config = require('../webpack.config');
    config.entry.app.push('webpack-hot-middleware/client', 'webpack/hot/only-dev-server');
    config.plugins.push(new webpack.HotModuleReplacementPlugin());
    
    const bundler = webpack(config);
    app.use(webpackDevMiddleware(bundler, { noInfo: true }));
    app.use(webpackHotMiddleware(bundler, { log: console.log }));
}

app.get('/api/issues', (req, res) => {
    const filter = {};
    if (req.query.status) filter.status = req.query.status;

    db.collection('issues').find(filter).toArray().then(issues => {
        const metadata = { total_count: issues.length };
        res.json({ _metadata: metadata, records: issues });
    }).catch(err => {
        console.log(err);
        res.status(500).json({message: `Internal Server Error: ${err}`});
    });
    // res.send(JSON.stringify({ _metadata: metadata, records: issues }))
});

app.post('/api/issues', (req, res) => {
    const newIssue = req.body;
    newIssue.created = new Date();

    if (!newIssue.status) {
        newIssue.status = 'New'
    } 

    const err = Issue.validateIssue(newIssue);
    
    if (err) {
        res.status(422).json({ message: `Invalid request: ${err}` });
        return;
    }

    db.collection('issues').insertOne(Issue.cleanupIssue(newIssue)).then(result => 
        db.collection('issues').find({ _id: result.insertedId }).limit(1).next()
    ).then(newIssue => {
        res.json(newIssue);
    }).catch(err => {
        console.log(err);
        res.status(500).json({ message: `Invalid request: ${err}` });
    });
});

app.get('/*', (req, res) => {
    res.sendFile(path.resolve('static/index.html'));
});

let db;
MongoClient.connect('mongodb://localhost/issuetracker').then(connection => {
    db = connection.db('issuetracker');
    
    app.listen(3000, function(){
        console.log('App listening on port 3000');
    }); 
}).catch(err => {
    console.log('ERROR:', err);
});