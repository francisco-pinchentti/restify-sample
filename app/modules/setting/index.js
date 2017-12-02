const SettingService = require('./SettingService');
const SettingController = require('./SettingController');

module.exports = function (db) {
    const settingModel = db.applicationModels.setting;
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
