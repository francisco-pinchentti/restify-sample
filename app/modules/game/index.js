var GameService = require('./GameService');
var GameController = require('./GameController');

module.exports = function (db) {
	var gameModel = db.game;
	var genreModel = db.genre;
	var gameService = new GameService(gameModel, genreModel);
	var gameController = new GameController(gameService);
	var gameValidator = require('./GameValidator');

	return {
		controller: gameController,
		model: gameModel,
		service: gameService,
		validator: gameValidator,
		resourceRoute: '/game'
	};
};
