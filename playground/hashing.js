const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');

var data = {
  id: 10
};

var token = jwt.sign(data, '123abc');
console.log(`Hash: ${token}`);

var decoded = jwt.verify(token, '123abc');
console.log(decoded, decoded);

// var message = 'i am user number 3';
//
// var hash = SHA256(message).toString();
//
// console.log(`Message: ${message}`);
// console.log(`Hash: ${hash}`);

//
// var token = {
//   data,
//   hash: SHA265(JSON.stringify(data)).toString()
// }
