const AuthService = require("../services/auth.service");
const { withData, withMessage } = require("../util/response.util");
let auth_service = new AuthService();

const register = async (request, response, next) => {
  try {
    let { email, password, full_name } = request.validData;
    let data = await auth_service.register({ email, password,full_name  });
    return withData(response, data, 201);
  } catch (error) {
    next(error);
  }
};
const login = async (request, response, next) => {
  try {
    let data = await auth_service.login(request, response, next);
    return withData(response, data)
  } catch (error) {
    next(error);
  }
};

const refreshToken = async (request, response, next) => {
  try {
    const data = await auth_service.refreshToken(request); // Call the refresh token service
    return withData(response, data); 
  } catch (error) {
    next(error); 
  }
};
const forgotPassword = async (request, response, next) => {
  try {
    const { email } = request.validData;
    let message = await auth_service.forgetPassword(email);
    return withMessage(response,message)
  } catch (error) {
    next(error);
  }
};
const newPassword = async (request, response, next) => {
  try {
    const { token, password } = request.validData;
    let message = await auth_service.newPassword(password, Number(token));
    return withMessage(response, message)
  } catch (error) {
    next(error);
  }
};
module.exports = { register, login, refreshToken, forgotPassword, newPassword };
