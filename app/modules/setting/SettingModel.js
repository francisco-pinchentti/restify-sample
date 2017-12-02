module.exports = function (sequelize, DataTypes) {

	const SettingModel = sequelize.define('setting', {
        enabled: DataTypes.BOOLEAN
	});

	return SettingModel;

};
