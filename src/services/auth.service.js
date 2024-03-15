const passport = require("passport");
const jwt = require("jsonwebtoken");

const {
  USER_EXISTS_ERROR,
  VALIDATION_ERROR,
} = require("../middlewares/errors/ApiError");
const User = require("../models/User");
const { hashToken } = require("../util/token.util");

class AuthService {
  register = async (data) => {
    const user = await User.findOne({ where: { email: data.email } });

    if (user) {
      throw new USER_EXISTS_ERROR();
    }
    let password = await hashToken(data.password);
    let email = data.email;
    let full_name = data.full_name;
    let newUser = await User.create({ email, full_name, password });
    newUser.save();
    return newUser;
  };
  login = (request, response, next) => {
    return new Promise((resolve, reject) => {
      passport.authenticate("local", (err, user, info) => {
        try {
          if (err) {
            reject(err);
          }
          if (!user) {
            throw new VALIDATION_ERROR(
              "validation error",
              info?.status,
              info?.message,
              true
            );
          }

          request.login(user, { session: false }, (err) => {
            if (err) {
              reject(err);
            }
            const access_token = jwt.sign(user, process.env.SECRET);

            resolve({ user, access_token });
          });
        } catch (error) {
          reject(error);
        }
      })(request, response, next);
    });
  };
}

module.exports = AuthService;
