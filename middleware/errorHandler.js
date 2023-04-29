const { constants } = require("../constants");

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  switch (statusCode) {
    case constants.VALIDATION_ERROR:
      res.json({
        title: 'validation error',
        mesage: err.message,
        stackTrace: err.stack,
      });
    
    case constants.NOT_FOUND:
      res.json({
        title: 'Not found error ',
        mesage: err.message,
        stackTrace: err.stack,
      });
    
    case constants.UNAUTHORIZED:
      res.json({
        title: 'unauthoriezed error',
        mesage: err.message,
        stackTrace: err.stack,
      });
    
    case constants.FORBIDDEN:
      res.json({
        title: 'forbidden error',
        mesage: err.message,
        stackTrace: err.stack,
      });
    

    case constants.SERVER_ERROR:
      res.json({
        title: 'server error',
        mesage: err.message,
        stackTrace: err.stack,
      });
      default:
        console.log("no error all good");
        break;
  }
};

module.exports = errorHandler;
//if u want to use error handler and apply at server,js
