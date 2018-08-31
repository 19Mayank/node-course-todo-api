const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


var password = '123abc!';

// bcrypt.genSalt(10, (err, salt)=> {
//   bcrypt.hash(password, salt, (err, hash) => {
//     console.log(`\nHash: ${hash} \n`);
//   });
// });

var hashedPassword = '$2a$10$RP/afKh/jzpy2Nl1rG9eR.QCr7QLB51mrAiTvIgj0azXVo.sU/IhK';

bcrypt.compare(password, hashedPassword, (err, res)=>{
  console.log(`\nResult: ${res} \n`);
});

// var data = {
//   id: 10
// };
//
// var token = jwt.sign(data, '123abc');
// console.log(`Hash: ${token}`);
//
// var decoded = jwt.verify(token, '123abc');
// console.log(decoded, decoded);

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
