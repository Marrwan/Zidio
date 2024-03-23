
const LocationService = require("../services/location.service");
const { withData } = require("../util/response.util");
let location_service = new LocationService();

const create = async (request, response, next) => {
    try { 
       let data = request.validData;  
       let user = request.user;
       data = await location_service.create(data, user)

       return withData(response, data)
       
      } catch (error) {
        next(error);
      }
}
const update =  async (request, response, next ) => {
  try {
    let data = request.body;
    let {id} = request.params;
    data = await location_service.update(data, id)
    return withData(response,data)
  } catch (error) {
    next(error)
  }
}



module.exports = {create, update}