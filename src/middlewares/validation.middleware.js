const {VALIDATION_ERROR} = require('./errors/ApiError')

const validateRequest = (schema, property = "body") => {
  return (request, response, next) => {
    let validation = schema.validate(request[property], { allowUnknown: true });
    
    if (validation.error) {
      const error = validation.error.details.map((e) => e.message);
      throw new VALIDATION_ERROR("validation error", 201, error); // can be error.message
    }
    request.validData = validation.value;
    
    next();
  };
};

module.exports = validateRequest;