const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose.js');
const {Todo} = require('./../server/models/todo.js');
const {User} = require('./../server/models/user.js');


//Todo.remove

// Todo.remove({}).then((result) => {
//   console.log('Todo Remove: /n', result);
// });

Todo.findOneAndRemove({_id: 'rstjms'}).then((result) => {
  console.log('Todo Remove: /n', result);
});

Todo.findByIdAndRemove('5b81e2f70665af1da8561fd5').then((todo) => {
  console.log('Todo Remove: /n', todo);
});
