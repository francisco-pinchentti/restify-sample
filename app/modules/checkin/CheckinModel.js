module.exports = function (sequelize, DataTypes) {

	var model = sequelize.define('checkin', {
		visitorId: DataTypes.STRING,
		from:  DataTypes.DATE,
		to: DataTypes.DATE
	});

	return model;

};
