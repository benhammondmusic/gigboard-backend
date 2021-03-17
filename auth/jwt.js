const jwt = require("jsonwebtoken");

const createToken = (user) => {

  const payload = {
    firstName: user.firstName,
    lastName: user.lastName,
    userName: user.username,
    email: user.email,
    id: user._id,
    //groups: ['seeker', 'poster'] -to differentiate in future
  };

  const token = jwt.sign(payload, "JWT_Secret");

  return token;
};

const decodeUser = (token) => {
  var decoded = jwt.verify(token, "JWT_Secret");
  return decoded;
};

module.exports = {
  createToken,
  decodeUser,
}