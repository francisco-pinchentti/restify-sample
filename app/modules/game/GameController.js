var GameController = function (gameService) {
    this.gameService = gameService;
};

GameController.prototype.list = function (request, response, next) {
    return response.promise(this.gameService.list(request.sequelizeQuery));
};

GameController.prototype.create = function (request, response, next) {
    return response.promise(this.gameService.create(request.body));
};

module.exports = GameController;
