const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const bcrypt = require('bcrypt'); // fpr hasing the password
const jwt = require('jsonwebtoken');

const registerUser = asyncHandler(async (req, res) => {
  //valiadtion or condition
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error('all fields are manditory');
  }

  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    res.status(400);
    throw new Error('user already registered');
  }
  //since password is a raw and we cannot store the raw passowrd so we will hash our password so we use bcrypt lib
  //create hash pawword
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log('hash password', hashedPassword);

  //create a new user
  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });
  console.log(`user created ${user}`);
  if (user) {
    res.status(201).json({ _id: user.id, email: user.email });
  } else {
    res.status(400);
    throw new Error('usre data not valid');
  }

  res.json({ message: 'register  the user' });
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error('all fields are mandatory!');
  }

  const user = await User.findOne({ email });
  //compare passowrd with hashpassowrd
  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '15m' }  //15 min 
    );
    res.status(200).json({ accessToken });
  } else {
    res.status(401);
    throw new Error('email or password is not valid');
  }
  //res.json({ message: 'login user' });
});

//current user info
//@route POST /api/users/current
//@acess private 
const currentUser = asyncHandler(async (req, res) => {
    res.json(req.user);
  //res.json({ message: 'current user' });
});

module.exports = { registerUser, loginUser, currentUser };