const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

const port = process.env.PORT || 3000;

var app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    console.log(req.body);
    var todo = new Todo({
        text: req.body.text
    });

    todo.save().then((doc) => {
        res.send(doc);
      }, (e) => {
        res.status(400).send(e);
    });

});

app.get('/todos', (req, res) => {

    Todo.find().then((todos) => {
        res.send({todos});
      }, (e) => {
        res.status(400).send(e);
    });

});


app.get('/todos/:id', (req,res) => {
  var id = req.params.id;

  if(!ObjectID.isValid(id)){
    res.status(400).send('ID not Valid');
    return console.log('ID not Valid');
  }

  Todo.findById(id).then((todo) =>{
    if(!todo){
      res.status(400).send('');
    }

    console.log('\n\n\n THE TODO \n',todo);
    res.send({todo});

  },(e) => {
    console.log('Error',e);
    res.status(400).send({});
  });

});


app.listen(port, ()=>{
  console.log('Started on port ', port);
});

module.exports = {app};

//
// user.save().then((doc) => {
//   console.log('saved todo \n ', doc);
// }, (e) => {
//   console.log('Unable to save todo \n ', e);
// });
