const Promise = require('bluebird');

class UserController {

    constructor (userService) {
        this.userService = userService;
    }

    list (request, response) {
        return response.promise(this.userService.list(request.sequelizeQuery));
    }

    get (request, response) {
        return response.promise(new Promise( (resolve) => {
                return resolve({ id: request.params.id });
            })
        );
    }

    create (request, response) {
        return response.promise(this.userService.create(request.body));
    }

}

module.exports = UserController;
