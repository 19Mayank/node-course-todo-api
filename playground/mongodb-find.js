// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp',{ useNewUrlParser: true },(err, client)=>{
  if(err){
    return console.log(`Unable to Connect to MongoDB server \n ${err}`);
  }
    console.log(`Connected to MongoDB server.`);

    const db = client.db('TodoApp');

    db.collection('Users')
    .find({name: 'Himalaya Parashar'})
    .toArray()
    .then((docs) => {
      console.log('\n Todos \n');
      console.log(JSON.stringify(docs, undefined, 2));
    }, (err) => {
      return console.log(`Unable to fetch todos \n ${err}`);
    });

    client.close();
});
