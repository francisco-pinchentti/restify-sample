/**
* Initializes sequelize and loads all application models including associations
*
* @see {@link https://github.com/sequelize/express-example/blob/master/models/index.js}
* @module db
*/

var fs = require('fs');
var path = require('path');
var Sequelize = require('sequelize');

/**
* @constant {string} APP_MODULES_FOLDER - needed since modules are located in another directory
*/
const APP_MODULES_FOLDER = 'app/modules';

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
		sequelize: sequelize,
		Sequelize: Sequelize,
		applicationModels: {}
	};

	fs
	.readdirSync(APP_MODULES_FOLDER)
	.filter(function(filename) {
		return fs.statSync(path.join(APP_MODULES_FOLDER, filename)).isDirectory();
	})
	.forEach(function(moduleDirectory) {
		fs.readdirSync(path.join(APP_MODULES_FOLDER, moduleDirectory))
		.filter(function(filename) {
			return /.*Model\.js$/.test(filename);
		})
		.forEach(function(modelFilename) {
			let modelPath = path.join(
				'..',
				APP_MODULES_FOLDER,
				moduleDirectory,
				modelFilename
			);
			let model = sequelize.import(modelPath);
			db.applicationModels[model.name] = model;
		});
	});

	Object.keys(db.applicationModels).forEach(function(modelName) {
		if ('associate' in db.applicationModels[modelName]) {
			db.applicationModels[modelName].associate(db);
		}
	});

	return db;
};
