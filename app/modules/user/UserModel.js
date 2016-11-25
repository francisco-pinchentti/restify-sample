module.exports = function (sequelize, DataTypes) {

	var model = sequelize.define('user', {
		firstname: DataTypes.STRING,
		lastname: DataTypes.STRING,
		email: DataTypes.STRING,
		workphone: DataTypes.STRING,
		homephone: DataTypes.STRING,
		password: DataTypes.STRING,
		birthdate: DataTypes.DATE // FIXME sequelize sets to DATETIME, need just DATE
	});

	return model;

};
