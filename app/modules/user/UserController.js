var UserController = function (userService) {
  this.userService = userService;
};

UserController.prototype.list = function (request, response, next) {
    console.log(request.sequelizeQuery);
    return response.promise(this.userService.list(request.sequelizeQuery));
    // response.promise(true);
};

UserController.prototype.get = function (request, response, next) {
    return response.promise(Promise.resolve(
        {
            id: request.params.id
        }
    ));
};

UserController.prototype.create = function (request, response, next) {
    return response.promise(this.userService.create(request.body));
};

UserController.prototype.delete = function (request, response, next) {

};

UserController.prototype.update = function (request, response, next) {

};

module.exports = UserController;
