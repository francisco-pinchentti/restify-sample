/**
 * @module login
 */

const LoginService = require('./LoginService');
const LoginController = require('./LoginController');

module.exports = function (db) {
    const loginService = new LoginService(db.applicationModels.login, db.applicationModels.user);
    const loginController = new LoginController(loginService);
    const loginValidator = require('./LoginValidator');

    return {
        controller: loginController,
        service: loginService,
        validator: loginValidator,
        resourceRoute: '/login',
        requiresAuth: false
    };
};
