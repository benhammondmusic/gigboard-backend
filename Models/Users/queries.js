const User = require('../User');
const mongoose = require('mongoose');

const newUser = async (body) => {
  try {
    console.log(body, 'body inside queries.newUser');

    return await User.create(body);
  } catch (error) {
    return error;
  }
};

const userExists = async (email) => {
  try {
    const foundUser = await User.find({ email: email });
    console.log(foundUser, 'foundUser inside userExists querie');
    return foundUser.length !== 0;
  } catch (error) {
    console.log(error, 'inside UserExists');
  }
};

module.exports = {
  newUser,
  userExists,
};
