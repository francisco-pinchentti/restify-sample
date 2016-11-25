var LoginController = function (loginService) {
    this.loginService = loginService;
};

LoginController.prototype.create = function (request, response) {
    return response.promise(this.loginService.login(request.body.email, request.body.password));
};

module.exports = LoginController;
