var Promise = require("bluebird");

var GameService = function (gameModel, genreModel) {
    this.gameModel = gameModel;
	this.genreModel = genreModel;
};

GameService.prototype.list = function (query) {
    return this.gameModel.findAll(query.findAll);
};

GameService.prototype.get = function (id) {
};

GameService.prototype.create = function (newGameData) {
	var self = this;
	// when no genres are given creation may be simplified
	return new Promise(function (resolve, reject) {
		// looks for genres to be able to associate to the new game
		self.genreModel.findAll({ where: { id: newGameData.genres }}).
		then(function(genres) {
			self.gameModel.build(newGameData).save().then(function(newGame) {
				newGame.setGenres(genres).then(resolve);
			});
		}, reject);
	});
};

module.exports = GameService;
