module.exports = function (sequelize, DataTypes) {

	var GameModel = sequelize.define('game', {
		name: DataTypes.STRING,
		thumbnailUrl: DataTypes.STRING,
		isPinned: DataTypes.BOOLEAN
	});

	GameModel.associate = function (db) {
		this.belongsToMany(db.genre, { through: 'game_genre' });
	};

	return GameModel;

};
