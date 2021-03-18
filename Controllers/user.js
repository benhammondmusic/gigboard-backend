// const { newUser } = require('../Models/Users/queries');
const { User } = require('../Models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

/* NOTE Register functionality */
const register = async (req, res) => {
  try {
    const { email, username } = req.body;

    /* We want to isolate the actual password because we are going to salt and hash it */
    let { password } = req.body;
    
    console.log(email, 'email just before userExists()');
    
    /* I decided to move what was on queries over here to see what impact it would have */
    const foundUser = await User.findOne({ email })

    if (foundUser) {
      return res.status(400).json({
          status: 400,
          message: "Something went wrong! Please try again"
      })
    }

    const salt = await bcrypt.genSaltSync(10);
    const hash = await bcrypt.hashSync(password, salt);

    password = hash;

    const newUserPayload = {
      email,
      password,
    };
    console.log(newUserPayload)

    await User.create(newUserPayload);

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
    if (email === '' || password === '') {
      throw 'missingInformation';
    }

    /* Checking our database for the email entered on login page */
    const foundUser = await User.findOne({ email });

    /* Throws error if couldn't find a user */
    if (!foundUser) {
      throw 'invalidUser';
    }

    /* Saving into a variable if the password entered is equal to the password of that user */
    const match = await bcrypt.compare(password, foundUser.password);

    if (match) {
      // For now I'm only going to send some json data until we have the JWT set up
      const signedJwt = jwt.sign(

        {
          /* payload */ 
          _id: foundUser._id,
          email: foundUser.email,
          username: foundUser.username,
        },
        process.env.SUPER_SECRET_KEY,
        {
          expiresIn: '24h',
        }
      );

      console.log(jwt);
      return res.status(200).json({
        status: 200,
        message: 'Success',
        signedJwt,
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
