const {
    USER_EXISTS,
    USER_NOT_FOUND,
    ERROR_500,
    ROUTE_NOT_FOUND,
    UNAUTHORIZED,
    VALIDATION,
  } = require("../../constants/messages.constant");
  const BaseError = require("./BaseError");
  
  class USER_EXISTS_ERROR extends BaseError {
    constructor(
      name,
      statusCode = USER_EXISTS.status,
      description = USER_EXISTS.message,
      isOperational = true
    ) {
      super(name, statusCode, description, isOperational);
    }
  }
  
  class USER_404_ERROR extends BaseError {
    constructor(
      name,
      statusCode = USER_NOT_FOUND.status,
      description = USER_NOT_FOUND.message,
      isOperational = true
    ) {
      super(name, statusCode, description, isOperational);
    }
  }
  
  class SERVER_ERROR extends BaseError {
    constructor(
      name,
      statusCode = ERROR_500.status,
      description = ERROR_500.message,
      isOperational = true
    ) {
      super(name, statusCode, description, isOperational);
    }
  }
  
  class VALIDATION_ERROR extends BaseError {
    constructor(
      name,
      statusCode = VALIDATION.status,
      description = VALIDATION.message,
      isOperational = true
    ) {
      super(name, statusCode, description, isOperational);
    }
  }
  
  class ROUTE_404_ERROR extends BaseError {
    constructor(
      name,
      statusCode = ROUTE_NOT_FOUND.status,
      description = ROUTE_NOT_FOUND.message,
      isOperational = true
    ) {
      super(name, statusCode, description, isOperational);
    }
  }
  class UNAUTHORIZED_ERROR extends BaseError {
    constructor(
      name,
      statusCode = UNAUTHORIZED.status,
      description = UNAUTHORIZED.message,
      isOperational = true
    ) {
      super(name, statusCode, description, isOperational);
    }
  }
  module.exports = {
    SERVER_ERROR,
    USER_EXISTS_ERROR,
    USER_404_ERROR,
    VALIDATION_ERROR,
    ROUTE_404_ERROR,
    UNAUTHORIZED_ERROR,
  };
  