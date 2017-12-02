/**
 * @module Setting
 */

const SettingService = require('./SettingService');
const SettingController = require('./SettingController');

/**
 * @constructor
 * @param {object} db
 */
module.exports = function (db) {
    const settingModel = db.applicationModels.setting;
    /**
    * @attribute {Setting.SettingService#} - settingService
    */
    const settingService = new SettingService(settingModel);
    const settingController = new SettingController(settingService);
    const settingValidator = require('./SettingValidator');

    return {
        controller: settingController,
        model: settingModel,
        service: settingService,
        validator: settingValidator,
        resourceRoute: '/settings',
        requiresAuth: true
    };
};
