// eslint-disable
require('dotenv').config({ path: '.env'})
const MongoClient = require('mongodb').MongoClient;

const mongoClient = new MongoClient(process.env.MONGODB_URI, { 
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoClient.connect((err, client) => {
  // console.log({ err, client })
  const db = client.db(process.env.DB_NAME);
  db.collection(process.env.DB_COLLECTION).remove({});
  const owners = ['Roger', 'Eddie', 'Karen', 'Helen', 'Victor', 'Violet'];
  const statuses = ['New', 'Open', 'Assigned', 'Fixed', 'Verified', 'Closed'];
  const issues = [];

  for(let i = 0; i < 1000; i++) {
    const randomCreatedDate = new Date( new Date() - Math.floor(Math.random() * 60) * 1000*60*60*24);
    const randomCompletionDate = new Date( new Date() - Math.floor(Math.random() * 60) * 1000*60*60*24); 
    const randomOwner = owners[ Math.floor(Math.random() * 6) ];
    const randomStatus = statuses[ Math.floor(Math.random() * 6) ];
    const randomEffort = Math.ceil(Math.random() * 20);

    const issue = {
      created: randomCreatedDate,
      completionDate: randomCompletionDate,
      owner: randomOwner,
      status: randomStatus,
      effort: randomEffort
    };

    issue.title = 'Lorem ipsum dolor sit amet' + i;
    issues.push(issue);
  }
  db.collection(process.env.DB_COLLECTION).insertMany(issues, (err, result) => {
    console.log({ err, result });
  });

  db.collection(process.env.DB_COLLECTION).createIndex({ status: 1 });
  db.collection(process.env.DB_COLLECTION).createIndex({ owner: 1 });
  db.collection(process.env.DB_COLLECTION).createIndex({ created: 1 });
  db.collection(process.env.DB_COLLECTION).createIndex({ title: "text" });
  
  client.close();
});