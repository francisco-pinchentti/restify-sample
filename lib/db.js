/**
* Initializes sequelize and loads all application models including associations
*
* @module db
*/

var fs = require('fs');
var path = require('path');
var Sequelize = require('sequelize');

/**
 * @constant {string} APPMODULESFOLDER - needed since modules are
 * located in another directory
 */
var APPMODULESFOLDER = 'app/modules';

/**
* Will connect to database and load all models found in application modules
* folder (files matching *Model.js). Lastly will load models associations.
*
* @param {object} settings - server config
* @return {object} Containing all models loaded and refrerences to sequelize (both to instance and module)
*/
module.exports = function (settings) {

	var sequelize = new Sequelize(settings.database, settings.username, settings.password, settings.options);

	var db = {
		sequelize : sequelize,
		Sequelize : Sequelize
	};

	fs
	.readdirSync(APPMODULESFOLDER)
	.filter(function(filename) {
		return fs.statSync(path.join(APPMODULESFOLDER, filename)).isDirectory();
	})
	.forEach(function(moduleDirectory) {
		fs.readdirSync(path.join(APPMODULESFOLDER, moduleDirectory))
		.filter(function(filename) {
			return /.*Model\.js$/.test(filename);
		})
		.forEach(function(modelFilename) {
			var modelPath = path.join(
				'..',
				APPMODULESFOLDER,
				moduleDirectory,
				modelFilename
			);
			var model = sequelize.import(modelPath);
			db[model.name] = model;
		});
	});

	Object.keys(db).forEach(function(modelName) {
		if ('associate' in db[modelName]) {
			db[modelName].associate(db);
		}
	});

	return db;
};
