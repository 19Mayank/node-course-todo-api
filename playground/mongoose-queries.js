const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose.js');
const {Todo} = require('./../server/models/todo.js');
const {User} = require('./../server/models/user.js');

var id = '5b80685866ed1a30809bdf67';

  if(!ObjectID.isValid(id)){
    console.log('ID not Valid');
  }

  User.findById(id).then((user) => {
    if(!user){
      return console.log('\n User Not Found \n');
    }

    console.log('User Info \n', user);
  },(e) => {
    console.log(e)
  });


// Todo.find({
//   _id: id
// }).then((todos) => {
//   console.log('todos find \n', todos);
// });
//
// Todo.findOne({
//   _id: id
// }).then((todo) => {
//   console.log('todos findONE \n', todo);
// });
//
// Todo.findById(id)
//   .then((todo) => {
//     if(!todo){
//         return console.log('\n\n #### \n ID Not Found. \n ####\n\n');
//     }
//
//     console.log('\n\n #### \n todo by ID \n ####\n\n', todo);
//   }).catch((e) => console.log(e));
