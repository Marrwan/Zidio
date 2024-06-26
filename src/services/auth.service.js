const passport = require("passport");
const jwt = require("jsonwebtoken");

const {
  USER_EXISTS_ERROR,
  VALIDATION_ERROR,
  UNAUTHORIZED_ERROR,
  USER_404_ERROR,
  SERVER_ERROR,
} = require("../middlewares/errors/ApiError");
const { hashToken, generateRandomNumber } = require("../util/token.util");
const { User } = require("../models/Models");
const { addNewSubscriber, sendMail } = require("../util/novu.utils");

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
    newUser.password = null;
    await addNewSubscriber(`${newUser.id}em`, newUser);
    await sendMail("account-activation", `${newUser.id}em`, "");

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
            const access_token = jwt.sign({user}, process.env.SECRET, {expiresIn : '1d'});
            // const refresh_token = jwt.sign({user}, process.env.SECRET, {expiresIn : '1d'});

            resolve({ user, access_token });
          });
        } catch (error) {
          reject(error);
        }
      })(request, response, next);
    });
  };
  refreshToken = async (request) => {
    try{

    
    // 1. Extract refresh token from request headers (replace with your strategy)
    const { token } = request.validData;

    // 2. Verify refresh token validity (using a separate secret key)

    const decoded = await jwt.verify(token, process.env.SECRET);
    
    // Ensure that the decoded object contains an email property
    if (!decoded?.user || !decoded?.user?.email) {
      throw new Error("Invalid refresh token (email not found)");
    }
    const email = decoded.user.email;

    // 3. Fetch user from database
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new USER_404_ERROR("Invalid refresh token (user not found)");
    }
    // request.login(user, { session: false }, (err) => {
    //   if (err) {
    //     throw new Error(err)
    //   }
    // }
    // )
    
    // 4. Generate new access token (using a different secret key)
    const access_token = jwt.sign({user: decoded.user}, process.env.SECRET);

    // 5. Send response with new access token
    return { access_token };
  }catch(err){
    throw new SERVER_ERROR(err.name, err?.statusCode || 400, err.message )
  }
  };
  forgetPassword = async (email) => {
    let user = await User.findOne({ where: { email } });

    // if user is not found, throw an error
    if (!user) {
      throw new USER_404_ERROR();
    }
    // create a new five characters long token using crypto
    let forgotPasswordToken = await generateRandomNumber(5);

    // user.update
    await user.update({ forgotPasswordToken });
    await user.save();
    // send the token to user's email address using Novu

    sendMail("forgot-password", `${user.id}em`, forgotPasswordToken);

    return { message: "Check your email address for your token", data: user };
  };
  newPassword = async (password, forgotPasswordToken) => {
    console.log({ forgotPasswordToken });
    let user = await User.findOne({
      where: { forgotPasswordToken: `${forgotPasswordToken}` },
    });
    if (!user) {
      throw new USER_404_ERROR("token error", 400, "Token Invalid");
    }
    const hashedPassword = await hashToken(password);

    await user.update({ password: hashedPassword });
    return "Your password has been updated, write it somewhere so you can remember 😴";
  };
}

module.exports = AuthService;
