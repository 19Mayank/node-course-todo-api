require('./config/config.js');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');
const jwt = require('jsonwebtoken');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

const port = process.env.PORT;

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
    console.log('ID not Valid');
    return res.status(404).send();
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

  app.delete('/todos/:id', (req,res) => {
    var id =req.params.id;

    if(!ObjectID.isValid(id)){
      console.log('ID not Valid');
      return res.status(404).send();
    }

    Todo.findByIdAndRemove(id).then((todo)=> {
      if(!todo){
        return res.status(404).send();
      }

      console.log('Todo \n\n', todo);
      res.send({todo});
    }).catch((e) => {
      res.status(400).send();
    });
  });

  app.patch('/todos/:id', (req, res) => {
    var id = req.params.id;

    var body = _.pick(req.body, ['text', 'completed']);

    if(!ObjectID.isValid(id)){
      console.log('ID not Valid');
      return res.status(404).send();
    }

    if(_.isBoolean(body.completed) && body.completed){
      body.completedAt = new Date().getTime();
    }else{
      body.completed = false;
      body.completedAt = null;
    }

    Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
      if(!todo){
        return res.status(404).send();
      }

      res.send({todo});

    }).catch((e) => {
      res.status(400).send();
    });

  });

  app.post('/users', (req,res) => {

    var body = _.pick(req.body, ['email', 'password']);

    var user = new User(body);
    console.log(user);

    user.save().then(() => {
    //console.log('save user : \n',user);
      return user.generateAuthToken();
      // res.send(user);
    }).then((token) => {
      res.header('x-auth', token).send(user);
      console.log('token: ',token);
    }).catch((e) => {
      res.status(400).send(e);
    });
  });


app.listen(port, ()=>{
  console.log(`Started on port:  ${port}`);
});

module.exports = {app};
