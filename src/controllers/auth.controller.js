const AuthService = require("../services/auth.service");
const { withData } = require("../util/response.util");
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

module.exports = { register, login };
