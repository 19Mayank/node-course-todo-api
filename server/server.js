const express = require('express');
const bodyParser = require('body-parser');

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
