module.exports = function (sequelize, DataTypes) {

	var model = sequelize.define('login', {
		email: DataTypes.STRING,
		token: DataTypes.STRING
	});

	return model;

};
