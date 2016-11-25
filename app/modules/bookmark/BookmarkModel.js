module.exports = function (sequelize, DataTypes) {

	var BookmarkModel = sequelize.define('bookmark', {
		description: DataTypes.STRING,
        url: {
			type: DataTypes.STRING,
			unique: true
		}
	});

	return BookmarkModel;

};
