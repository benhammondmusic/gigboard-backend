const {newUser, userExists} = require('../Models/Users/queries');
const { User } = require('../Models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

/* NOTE Register functionality */
const register = async (req, res) => {
  try {
    /* password2 is the second item on the form to check their passwords match when registering */
    const { email, username } = req.body;

    /* We want to isolate the actual password because we are going to salt and hash it */
    let { password } = req.body;
    /* We could change the display message if there's a user already exists. Let me know what we could do. */
    if (userExists(email))
      return res.status(400).json({
        status: 400,
        message: 'User already exists',
        
      });

    const salt = await bcrypt.genSaltSync(10);
    const hash = await bcrypt.hashSync(password, salt);

    password = hash;

    const newUserPayload = {
      username,
      email,
      password,
    };

    console.log(newUserPayload)
    await newUser(newUserPayload);

    return res.status(201).json({
      status: 201,
      message: 'User created succesfully',
      requestedAt: new Date().toLocaleDateString(),
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      status: 400,
      message: 'Something went wrong! Please try again ya fool',
    });
  }
};

/* NOTE Login functionality */
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    /* This will check the user inputs both the email and password fields. If one is not filled then it will throw an error */
    if (email === '' || password === '') throw 'missingInformation';

    /* Checking our database for the email entered on login page */
    const foundUser = await User.findOne({ email });

    /* Throws error if couldn't find a user */
    if (!foundUser) throw 'invalidUser';

    /* Saving into a variable if the password entered is equal to the password of that user */
    const match = await bcrypt.compare(password, foundUser.password);

    /* I'll let you guys see what you think about this, do we want to send a message if the user typed the wrong pssw? */

    // if (!match) throw 'wrongPassword'

    if (match) {
      // For now I'm only going to send some json data until we have the JWT set up
      const signedJwt = jwt.sign(
        { /* payload */
          _id: foundUser._id,
          firstName: foundUser.firstName,
          lastName: foundUser.lastName,
          email: foundUser.email,
          username: foundUser.username
        },
        process.env.SUPER_SECRET_KEY,
        {
          expiresIn: '24h' 
        }
      );
        console.log(jwt)
      res.status(200).json({
        status: 200,
        message: 'Success',
        signedJwt
      });
    }
  } catch (error) {
    if (error === 'missingInformation') {
      return res.status(400).json({
        status: 400,
        message: 'Email and password cannot be empty',
      });
    }
    if (error === 'invalidUser') {
      return res.status(400).json({
        status: 400,
        message: "User doesn't exist",
      });
    }

    return res.status(500).json({
      status: 500,
      message: 'Something went wrong. Please try again',
    });
  }
};

module.exports = {
  register,
  login,
};
