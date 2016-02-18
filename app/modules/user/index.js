var UserService = require('./UserService');
var UserController = require('./UserController');

module.exports = function (db) {
  var userModel = db.user;
  var userService = new UserService(userModel);
  var userController = new UserController(userService);
  var userValidator = require('./UserValidator');

  return {
    controller: userController,
    model: userModel,
    service: userService,
    validator: userValidator,
    resourceRoute: '/user'
  };
};
