//this will handle the auth user to access all the private routes . or it is use to verify with token whether it is the same peroson or not
//a middleware which is help us to validate the token which a cleint is sending in our request as a bearer token

const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');

const validateToken = asyncHandler(async (req, res, next) => {
  let token;
  let authheader = req.headers.authorization || req.Authorization;
  if (authheader && authheader.startsWith('Bearer')) {
    token = authheader.split(' ')[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        res.status(401);
        throw new Error('user is not authorized');
      }
      req.user=decoded.user;
      next();
    });

    if(!token){
        res.status(401);
        throw new Error("user not authorized or token is missing ")
    }
  }
});

module.exports = validateToken;
