module.exports = function (sequelize, DataTypes) {

	var GenreModel = sequelize.define('genre', {
		name: DataTypes.STRING
	});

	GenreModel.associate = function (db) {
        this.belongsToMany(db.game, { through: 'game_genre' });
    };

	return GenreModel;

};
