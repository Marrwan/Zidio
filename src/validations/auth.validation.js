const Joi = require("joi");
const emailDto = {
  email: Joi.string()
    .email({ minDomainSegments: 2 })
    .trim()
    .required()
    .messages({
      "string.email": `Email should be a valid mail format`,
      "string.empty": `Email cannot be an empty field`,
      "any.required": `Email is a required field`,
    }),
}
const passwordDto = {
  password: Joi.string() 
  .trim()
  .min(6)
//   .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
  .required()
  .messages({
    "string.base": `Password should be a valid format`,
    "string.empty": `Password cannot be an empty field`,
    "string.min": `Password should be at least 6 characters long`,
  }),
}
const idDto = {
  id: Joi.string()
    .optional()
    .trim()
    .messages({ "string.empty": `Id field should not be empty` }),
}
const registerDto = Joi.object({
  ...emailDto,
  ...passwordDto,
  full_name: Joi.string().required(),
  
});
const newPasswordSchema = Joi.object({
  ...emailDto,
  password: Joi.string()
    .trim()
    .min(6)
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .optional()
    .messages({
      "string.base": `Password should be a valid format`,
      "string.empty": `Password cannot be an empty field`,
      "string.min": `Password should be at least 6 characters long`,
    }),
  
  token: Joi.number().required(),
});
const idSchema = Joi.object({
  
});
const loginDto = Joi.object({
  ...emailDto,
  ...passwordDto,
 
});
const forgotPasswordDto = Joi.object({
 ...emailDto
});


module.exports = {
  registerDto,
 
  newPasswordSchema,
  idSchema,
  loginDto,
  forgotPasswordDto,

};
