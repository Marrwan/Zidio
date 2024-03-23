const userService = require("../services/user.service");
const { withData } = require("../util/response.util");

let user_service = new userService()
const getLocation = async(request, response, next)=>{
    try {
        let data = await user_service.getLocation(request);
        return withData(response, data)
      } catch (error) {
        next(error);
      }


}

module.exports = {getLocation}