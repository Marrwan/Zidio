const { validateData, validateId } 

module.exports.validateRequest = (req, res, next) => {
  const result = validateData(req.body);
  if (result.error) {
    return res
      .status(400)
      .json({ error: result.error.details[0].message });
  }
  next();
}; 

module.exports.validateParams = (req, res, next) => {
  const result = validateId(req.params);
  if (result.error) {
    return res
      .status(400)
      .json({ error: result.error.details[0].message });
  }
  next();
};