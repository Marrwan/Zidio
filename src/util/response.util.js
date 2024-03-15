const send = (response, status, data = {}) => {
    return response.status(status).send({ ...data });
  };
  
  const withMessage = (response, message, status = 200) => {
    return send(response, status, { message });
  };
  
  const withData = (response, data = {}, status = 200) => {
    return send(response, status, {data});
  };
   
  module.exports = {
    withMessage,
    withData,
  };
  