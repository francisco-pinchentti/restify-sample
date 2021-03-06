var Promise = require('bluebird');

var UserController = function (userService) {
    this.userService = userService;
};

UserController.prototype.list = function (request, response) {
    return response.promise(this.userService.list(request.sequelizeQuery));
};

UserController.prototype.get = function (request, response) {
	return response.promise(new Promise( (resolve) => {
			return resolve({ id: request.params.id });
		})
	);
};

UserController.prototype.create = function (request, response) {
    return response.promise(this.userService.create(request.body));
};

// UserController.prototype.delete = function (request, response, next) { };

// UserController.prototype.update = function (request, response, next) { };

module.exports = UserController;
