const { USER_404_ERROR } = require("../middlewares/errors/ApiError");
const {  Location } = require("../models/Models");


class LocationService {
    create = async(data, user) => {
        
        // return user;
       const { cityname, country, date, note, countrycode, principality, latitude, longitude } = data;
       
       const location = await Location.create({cityname, country, date, note, countrycode, principality, position: {longitude, latitude}, UserId:user.dataValues.id})
       
       location.save()
       await  user.addLocations(location)
       await user.update({include: [location]})
       user.save()
    
       return {location, user};


    }

    update = async(data, id)  => {
        let location = await Location.findByPk(id)
        if(!location){
            throw new USER_404_ERROR('not found', 404, "Location does not exist")
        }
        await location.update(data)
        await location.save()
        return location.dataValues
    }
} 

module.exports = LocationService;