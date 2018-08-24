// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp',
        { useNewUrlParser: true },
        (err, client)=>{
              if(err){
                return console.log(`Unable to Connect to MongoDB server \n ${err}`);
              }
                console.log(`Connected to MongoDB server.`);

                const db = client.db('TodoApp');

                //deleteONE
                // db.collection('Todos').deleteOne({text: 'Eat Breakfast'}).then((result) => {
                //   console.log(result);
                // });

                //findOneand Delete
                db.collection('Users').findOneAndUpdate({
                  _id: new ObjectID('5b7f7489a8cb04324826aa44'
                )},{
                  $inc:{ age: 25}
                },{
                  returnOriginal: false
                }).then((result) => {
                    console.log(result);
                });

                client.close();
});
