const jwt = require("jsonwebtoken");

const createToken = (user) => {
  const payload = {
    email: user.email,
    id: user._id,
  };
  const token = jwt.sign(payload, "JWT_Secret");
  return token;
};
const decodeUser = (token) => {
  var decoded = jwt.verify(token, process.env.SUPER_SECRET_KEY);
  return decoded;
};

module.exports = {
  createToken,
  decodeUser,
};
