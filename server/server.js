import express from 'express';
import path from 'path';
import  bodyParser from 'body-parser';
import { MongoClient, ObjectID } from 'mongodb';
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

app.get('/api/issues/:id', (req, res) => {
    let issueId;

    try {
        issueId = ObjectID(req.params.id);
    } catch (err) {
        res.status(422).json({
            message: `Invalid issue ID format: ${err}`
        });

        return
    }

    db.collection('issues').find({ _id: issueId }).limit(1)
        .next()
        .then(issue => {
            if (!issue) res.status(404).json({
                message: `No such issue: ${issueId}`
            });

            res.json(issue);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: `Internal Server Error: ${err}`
            });
        });
});

app.get('/api/issues', (req, res) => {
    const filter = {};
    if (req.query.status) filter.status = req.query.status;
    if (req.query.effort_lte || req.query.effort_gte) filter.effort = {};
    if (req.query.effort_lte) filter.effort.$lte = parseInt(req.query.effort_lte, 10);
    if (req.query.effort_gte) filter.effort.$gte = parseInt(req.query.effort_gte, 10);
    
    if(req.query._summary === undefined) {
        let limit = req.query.limit ? parseInt(req.query._limit, 10) : 20;
        if (limit > 50 ) limit = 50;

        db.collection('issues').find(filter).limit(limit).toArray().then(issues => {
            const metadata = { total_count: issues.length };
            res.json({ _metadata: metadata, records: issues });
        }).catch(err => {
            console.log(err);
            res.status(500).json({message: `Internal Server Error: ${err}`});
        });
    } else {
        db.collection('issues').aggregate([
            { $match: filter },
            { $group: {
                _id: {
                    owner: '$owner',
                    status: '$status'
                },
                count: { $sum: 1 }
            }}
        ]).toArray()
        .then(results => {
            const stats = {}

            results.forEach(result => {
                const { _id: { owner, status}} = result;
                if(!stats[owner]) stats[owner] = {};
                stats[owner][status] = result.count;
            });

            res.json(stats);
        }).catch(err => {
            console.log({err});
            res.status(500).json({ message: `Internal Server Error: ${err}`});
        })
    }

    
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

app.put('/api/issues/:id', (req, res) => {
    let issueId;

    try {
        issueId = new ObjectID(req.params.id);
    }catch(err) {
        res.status(422).json({message: `Invalid issue ID format: ${err}`});
        return;
    }

    const issue = req.body;
    delete issue._id;

    const err = Issue.validateIssue(issue);
    if(err) {
        res.status(422).json({ message: `Invalid request: ${err}`});
        return;
    }

    db.collection('issues').update({ _id: issueId}, Issue.convertIssue(issue))
    .then(() => db.collection('issues').find({ _id: issueId}).limit(1).next())
    .then( savedIssue => {
        res.json(savedIssue);
    })
    .catch(err => {
        console.log({err});
        res.status(500).json({ message: `Internal Server Error: ${err}` });
    });
});

app.delete('/api/issues/:id', (req, res) => {
    let issueId;

    try {
        issueId = new ObjectID(req.params.id);
    }catch(err) {
        res.status(422).json({message: `Invalid issue ID format: ${err}`});
        return;
    }

    db.collection('issues').deleteOne({ _id: issueId })
    .then(deleteResult => {
        const { n } = deleteResult.result;
        if(n === 1) {
            res.json({ status: 'OK' });
        } else {
            res.json({ status: 'Warning: object not found' });
        }
    })
    .catch(error => {
        console.log({error});
        res.status(500).json({ message: `Internal Server Error: ${error}`});
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