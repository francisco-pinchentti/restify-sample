module.exports = function (sequelize, DataTypes) {

	var UserModel = sequelize.define('user', {
		firstname: DataTypes.STRING,
		lastname: DataTypes.STRING,
		email: {
			type: DataTypes.STRING,
			unique: true,
			allowNull: false
		},
		password: DataTypes.STRING
	});

	return UserModel;

};
