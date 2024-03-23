const passport = require("passport");
const jwt = require('jsonwebtoken')
const { UNAUTHORIZED_ERROR } = require("./errors/ApiError");
const { User, Location } = require("../models/Models");

const isLogin = async (request, response, next) => {
  passport.authenticate("jwt", { session: false }, async (err, user) => {
    try {
      if (err) {
        return next(err);
      }

      if (!user) {
        throw new UNAUTHORIZED_ERROR();
      }
      // You can optionally set the user on the request object if needed
      
      const refreshToken = request.headers.authorization?.split(" ")[1];

     
      // 2. Verify refresh token validity (using a separate secret key)
      const decoded = await jwt.verify(refreshToken, process.env.SECRET);
      const userId = decoded.id;
      // 3. Fetch user from database
      const the_user = await User.findByPk(userId, {include : [{model:Location, as: "locations"}]});
      request.user = the_user;
      next();
    } catch (error) {
      next(error);
    }
  })(request, response, next);
};

module.exports = { isLogin };
