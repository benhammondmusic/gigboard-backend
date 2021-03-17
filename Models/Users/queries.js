const User = require('../User');

const newUser = async (body) => {
    try {
      return await User.create(body)
    } catch (error) {
      return error
    }
}

const userExists = async (email) => {
    const foundUser = await User.find({ email });
    if (foundUser){
      return true
    } else {
      return false
    }
  }

module.exports = {
    newUser,
    userExists
};
