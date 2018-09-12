const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;

const app = express();

app.use(express.static('static'));
app.set('json spaces', 2); // makes the json response look pretty 
app.use(bodyParser.json());

const issues = [
    {
        id: 1,
        status: 'Open',
        owner: 'Ravan',
        created: new Date('2016-08-15'),
        effort: 5,
        completionDate: undefined,
        title: 'Error in console when clicking Add'
    },
    {
        id: 2,
        status: 'Assigned',
        owner: 'Eddie',
        created: new Date('2016-08-16'),
        effort: 14,
        completionDate: new Date('2016-08-30'),
        title: 'Missing bottom border on panel'
    }
];

const validIssueStatus = {
    New: true,
    Open: true,
    Assigned: true,
    Fixed: true,
    Verified: true,
    Closed: true
};

const issueFieldType = {
    id: 'required',
    status: 'required',
    owner: 'required',
    effort: 'optional',
    created: 'required',
    completionDate: 'optional',
    title: 'required'
};

function validateIssue(issue) {
    for(const field in issueFieldType){
        const type = issueFieldType[field];
        if (!type) {
            delete issue[field];
        } else if(type === 'required' && !issue[field]) {
            return `${field} is required`;
        }
    }

    if (!validIssueStatus[issue.status]) {
        return `${issue.status} is not a valid status`;
    }

    return null;
}

app.get('/api/issues', (req, res) => {
    db.collection('issues').find().toArray().then(issues => {
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
    newIssue.id = issues.length + 1;
    newIssue.created = new Date();

    if (!newIssue.status) {
        newIssue.status = 'New'
    } 

    const err = validateIssue(newIssue);
    
    if (err) {
        res.status(422).json({ message: `Invalid request: ${err}` });
    }

    issues.push(newIssue);
    res.json(newIssue);
});

let db;
MongoClient.connect('mongodb://localhost/issuetracker').then(connection => {
    db = connection.db('issuetracker');
    
    app.listen(3000, function(){
        console.log('App listening on port 3000');
    }); 
}).catch(err => {
    console.log('ERROR:', error);
});