class userService{
    getLocation = async(request) => {
        let user = request.user;
        return user?.locations || user?.dataValues?.locations
    }
}

module.exports = userService;