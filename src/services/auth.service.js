const passport = require("passport");
const jwt = require("jsonwebtoken");

const {
  USER_EXISTS_ERROR,
  VALIDATION_ERROR,
  UNAUTHORIZED_ERROR,
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
  refreshToken = async (request) => {
    // 1. Extract refresh token from request headers (replace with your strategy)
    const refreshToken = request.headers.authorization?.split(" ")[1];

    if (!refreshToken) {
      throw new UNAUTHORIZED_ERROR("Missing refresh token");
    }
    // 2. Verify refresh token validity (using a separate secret key)
    const decoded = await jwt.verify(refreshToken, process.env.SECRET);
    const userId = decoded.id.id;

    // 3. Fetch user from database
    const user = await User.findByPk(userId);
    if (!user) {
      throw new USER_404_ERROR("Invalid refresh token (user not found)");
    }

    // 4. Generate new access token (using a different secret key)
    const access_token = jwt.sign({ id: user }, process.env.SECRET, {
      expiresIn: 24 * 60 * 60, // Set expiry time
    });

    // 5. Send response with new access token
    return { access_token };
  };
}

module.exports = AuthService;
