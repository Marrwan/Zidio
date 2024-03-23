class userService{
    getLocation = async(request) => {
        let user = request.user;
        return user.locations
    }
}

module.exports = userService;