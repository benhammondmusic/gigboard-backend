// const { newUser } = require('../Models/Users/queries');
const { User } = require("../Models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

/* NOTE Register functionality */
const register = async (req, res) => {
  console.log(req.body, "req.body inside user register");
  try {
    const { email } = req.body;

    /* We want to isolate the actual password because we are going to salt and hash it */
    let { password } = req.body;

    const foundUserResponse = await User.findOne({ email });
    console.log(foundUserResponse, "found user response");

    if (foundUserResponse) {
      return res.status(400).json({
        status: 400,
        message: "Email address already exists. Please try logging in instead of registering",
      });
    }

    const salt = await bcrypt.genSaltSync(10);
    const hash = await bcrypt.hashSync(password, salt);

    password = hash;

    const newUserPayload = {
      email,
      password,
    };
    console.log(newUserPayload);

    const createUserResponse = await User.create(newUserPayload);
    console.log("response from User.create()", createUserResponse);

    res.status(201).json({
      currentUserId: createUserResponse._id,
      status: 201,
      message: "User created successfully",
      requestedAt: new Date().toLocaleDateString(),
    });
  } catch (error) {
    console.log(error, "ERROR REGISTERING USER");
    return res.status(400).json({
      status: 400,
      message: "Something went wrong! Please try again ya fool",
    });
  }
};

/* NOTE Google Register */

const registerGoogleUser = async (req, res) => {
  console.log(req.body, "req.body inside google register");
  try {
    const { email } = req.body;

    const foundUserResponse = await User.findOne({ email });
    console.log(foundUserResponse, "found user response");

    if (foundUserResponse) {
      return "user exists";
    }

    const createUserResponse = await User.create({ email });
    console.log("response from User.create()", createUserResponse);

    res.status(201).json({
      currentUserId: createUserResponse._id,
      status: 201,
      message: "User created successfully",
      requestedAt: new Date().toLocaleDateString(),
    });
  } catch (error) {
    console.log(error, "ERROR REGISTERING USER");
    return res.status(400).json({
      status: 400,
      message: "Something went wrong! Please try again ya fool",
    });
  }
};

/* NOTE Login functionality */
const login = async (req, res) => {
  console.log(req.body, "req.body inside user.login()");
  try {
    const { email, password } = req.body;

    /* This will check the user inputs both the email and password fields. If one is not filled then it will throw an error */
    if (email === "" || password === "") {
      console.log("Missing email and/or password");
      throw "missingInformation";
    }

    /* Checking our database for the email entered on login page */
    const foundUserResponse = await User.findOne({ email });

    /* Throws error if couldn't find a user */
    if (!foundUserResponse) throw "invalidUser";

    /* Saving into a variable if the password entered is equal to the password of that user */
    const match = await bcrypt.compare(password, foundUserResponse.password);

    if (match) {
      console.log(foundUserResponse.password, "found user password");

      return res.status(200).json({
        currentUserId: foundUserResponse._id,
        status: 200,
        message: "Success",
        // signedJwt,
      });
    }

    // if (match) {
    //   // For now I'm only going to send some json data until we have the JWT set up
    //   const signedJwt = jwt.sign(
    //     {
    //       /* payload */
    //       _id: foundUser._id,
    //       email: foundUser.email,
    //     },
    //     process.env.SUPER_SECRET_KEY,
    //     {
    //       expiresIn: "24h",
    //     }
    //   );

    // console.log(jwt);
    // return res.status(200).json({
    //   currentUserId: foundUserResponse._id,
    //   status: 200,
    //   message: 'Success',
    // signedJwt,
    // });
  } catch (error) {
    console.log(error, "ERROR IN USER CTRL LOGIN()");
    if (error === "missingInformation") {
      return res.status(400).json({
        status: 400,
        message: "Email and password cannot be empty",
      });
    }
    if (error === "invalidUser") {
      return res.status(400).json({
        status: 400,
        message: "User doesn't exist",
      });
    }

    return res.status(500).json({
      status: 500,
      message: "Something went wrong. Please try again",
    });
  }
};

module.exports = {
  register,
  login,
  registerGoogleUser,
};
