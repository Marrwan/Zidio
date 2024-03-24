const Joi = require("joi");
const emailDto = {
  email: Joi.string()
    .email({ minDomainSegments: 2 })
    .trim()
    .required()
    .messages({
      "string.email": `Email should be a valid mail format, abi u dey ment 🙄`,
      "string.empty": `Email cannot be an empty field, which village u come from 😬`,
      "any.required": `Email is a required field, who are u sef ? 🧐`,
    }),
};
const passwordDto = {
  password: Joi.string()
    .trim()
    .min(6)
    //   .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .required()
    .messages({
      "string.base": `Password should be a valid format`,
      "string.empty": `Password cannot be an empty field`,
      "string.min": `Password should be at least 6 characters long, abi u wan make them hack am ? 🤷🏽‍♂️`,
    }),
};
const idDto = {
  id: Joi.string()
    .optional()
    .trim()
    .messages({ "string.empty": `Id field should not be empty` }),
};
const registerDto = Joi.object({
  ...emailDto,
  ...passwordDto,
  full_name: Joi.string().required(),
});
const newPasswordSchema = Joi.object({
  password: Joi.string()
    .trim()
    .min(6)
    // .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .optional()
    .messages({
      "string.base": `Password should be a valid format`,
      "string.empty": `Password cannot be an empty field`,
      "string.min": `Password should be at least 6 characters long`,
    }),

  token: Joi.number().required(),
});
const idSchema = Joi.object({});
const loginDto = Joi.object({
  ...emailDto,
  ...passwordDto,
});
const forgotPasswordDto = Joi.object({
  ...emailDto,
});

const locationDto = Joi.object({
  cityname: Joi.string().required().messages({
    "string.empty": `City name is required, please na, abi una country no get city name ? 😒`,
  }),
  country: Joi.string().required().messages({
    "string.empty": `Country is required`,
  }),
  date: Joi.date().optional(),
  note: Joi.string().optional(),
  countrycode: Joi.string().length(2).optional().messages({
    "string.length": `Country code should be 2 characters`,
  }),
  principality: Joi.string().optional(),

  latitude: Joi.number().required().min(-90).max(90).messages({
    "number.base": `Latitude must be a number`,
    "number.required": `Latitude is required`,
    "number.min": `Latitude must be between -90 and 90`,
    "number.max": `Latitude must be between -90 and 90`,
  }),
  longitude: Joi.number().required().min(-180).max(180).messages({
    "number.base": `Longitude must be a number`,
    "number.required": `Longitude is required`,
    "number.min": `Longitude must be between -180 and 180`,
    "number.max": `Longitude must be between -180 and 180`,
  }),
});
const tokenDto = Joi.object({
  token: Joi.string().required().messages({
    "string.empty": `token is required na, wetin dey worry u 😏`,
  }),
})
module.exports = {
  registerDto,
locationDto,
  newPasswordSchema,
  idSchema,
  loginDto,
  forgotPasswordDto,
  tokenDto
};
