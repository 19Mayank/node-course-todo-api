// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

// var obj = new ObjectID();
// console.log(`${obj}`);

// var user = {name:'mayank', age: 26};
// var {name} = user;
// console.log(`${name}`);


MongoClient.connect('mongodb://localhost:27017/TodoApp',{ useNewUrlParser: true },(err, client)=>{
  if(err){
    return console.log(`Unable to Connect to MongoDB server \n ${err}`);
  }
    console.log(`Connected to MongoDB server.`);

    const db = client.db('TodoApp');

    // db.collection('Todos').insertOne({
    //   name: 'mayank',
    //   age: 26
    // }, (err, result) =>{
    //   if(err){
    //     return console.log(`Unable to Connect to MongoDB server \n ${err}`);
    //   }
    //   console.log(JSON.stringify(result.ops, undefined, 2));
    //
    // });

    // db.collection('Users').insertOne({
    //   name: 'Mayank Parashar',
    //   age: 26,
    //   location: 'Greater Noida'
    // }, (err, result) => {
    //   if(err){
    //        return console.log(`Unable to WRITE to MongoDB server \n ${err}`);
    //     }
    //    console.log(result.ops[0]._id.getTimestamp());
    // });

    client.close();
});
