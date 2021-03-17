//starter code from the reddit clone. still not sure how to do jwt auth so not sure if it all apllies

// const jwt = require("jsonwebtoken");
// const createToken = (user) => {
//   //backend team decide token data
//   const payload = {
//     userName: user.username,
//     email: user.email,
//     id: user._id,
//   };
//   const token = jwt.sign(payload, "SEI-REDDIT-CLONE");
//   return token;
// };

// const decodeUser = (token) => {
//   var decoded = jwt.verify(token, "SEI-REDDIT-CLONE");
//   return decoded;
// };

// module.exports = {
//   createToken,
//   decodeUser,
// }