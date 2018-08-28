const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server.js');
const {Todo} = require('./../models/todo.js');


const todos = [{
  _id: new ObjectID(),
  text: '1st test todo',
  completedAt : 333
},{
  _id: new ObjectID(),
  text: '2nd test todo',
  completed : true,
  completedAt : 333
}];

beforeEach((done) => {
  Todo.remove({}).then(() => {
    return Todo.insertMany(todos);
  }).then(() => done());
});

describe('POST /todos', () => {

  it('should create a new todo', (done) => {

    var text = 'test todo text';
    request(app)
      .post('/todos')
      .send({text})
      .expect(200)
      .expect((res) => {
        expect(res.body.text).toBe(text);
      })
      .end((err, res) => {
        if(err){
          return done(err);
        }

        Todo.find({text}).then((todos) => {
          expect(todos.length).toBe(1);
          expect(todos[0].text).toBe(text);
          done();
        }).catch((e) => done(e));
      });
  });

  it('Should Not Create todo with invalid body data', (done) => {

    request(app)
      .post('/todos')
      .send({})
      .expect(400)
      .end((err, res) => {
        if(err){
          return done(err);
        }

        Todo.find().then((todos) => {
          expect(todos.length).toBe(2);
          done();
        }).catch((e) => done(e));

      });
  });


});

describe('GET /todos', () => {
  it('should get all todos', (done) => {

    request(app)
      .get('/todos')
      .expect(200)
      .expect((res) => {
        expect(res.body.todos.length).toBe(2);
      })
      .end(done);

  });

});


  describe('PATCH /todos', () => {

    it('should update the todo', (done) => {

    var hexId = todos[0]._id.toHexString();
    var text = 'this should be the new text';

    //console.log(todos[0]);

    request(app)
      .patch(`/todos/${hexId}/`)
      .send({
      completed : true,
      text
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toEqual(text);
        expect(res.body.todo.completed).toBeTruthy();
        expect(typeof res.body.todo.completedAt).toBe('number');
      })
      .end(done);
    });
    //console.log(todos[0]);

    it('should clear completedAt when todo is not Completed', (done) => {

          var hexId = todos[0]._id.toHexString();
          var text = 'this should be the new text';

          //console.log(todos[0]);

          request(app)
            .patch(`/todos/${hexId}/`)
            .send({
            completed : false,
            text
            })
            .expect(200)
            .expect((res) => {
              expect(res.body.todo.text).toEqual(text);
              expect(res.body.todo.completed).not.toBeTruthy()
              expect(res.body.todo.completedAt).toBeNull();

            })
            .end(done);
  });
});
