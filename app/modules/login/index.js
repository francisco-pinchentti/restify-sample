var LoginService = require('./LoginService');
var LoginController = require('./LoginController');

module.exports = function (db) {
    var loginService = new LoginService(db.login, db.user);
    var loginController = new LoginController(loginService);
    var loginValidator = require('./LoginValidator');

    return {
        controller: loginController,
        service: loginService,
        validator: loginValidator,
        resourceRoute: '/login'
    };
};
