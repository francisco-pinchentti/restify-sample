/**
 * @module user
 */

const UserService = require('./UserService');
const UserController = require('./UserController');

module.exports = function (db) {
    const userModel = db.applicationModels.user;
    const userService = new UserService(userModel);
    const userController = new UserController(userService);
    const userValidator = require('./UserValidator');

    return {
        controller: userController,
        model: userModel,
        service: userService,
        validator: userValidator,
        resourceRoute: '/users',
        requiresAuth: true
    };
};
