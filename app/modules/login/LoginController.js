class LoginController {

    constructor (loginService) {
        this.loginService = loginService;
    }

    create (request, response) {
        return response.promise(this.loginService.login(request.body.email, request.body.password));
    }

}

module.exports = LoginController;
