module.exports = function (sequelize, DataTypes) {

	var BookmarkModel = sequelize.define('bookmark', {
		description: DataTypes.STRING,
        url: DataTypes.STRING
	});

	return BookmarkModel;

};
