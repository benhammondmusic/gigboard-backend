const User = require('../User');
const mongoose = require('mongoose');

const newUser = async (body) => {
  try {
    console.log(body, 'body inside queries.newUser');

    const res = await User.create(body);
    console.log('response to creating user', res);
    return res;
  } catch (error) {
    return error;
  }
};

/* I decided to move this function inside of user.js  */

// const userExists = async (email) => {
//   try {
//     const foundUser = await User.findOne({ email });
//     console.log(foundUser, 'foundUser inside userExists querie');
//     return foundUser !== null;

//   } catch (error) {
//     console.log(error, 'inside UserExists');
//   }
// };

module.exports = {
  newUser,
};
