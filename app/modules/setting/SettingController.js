var Promise = require('bluebird');

var SettingController = function (settingService) {
    this.settingService = settingService;
};

SettingController.prototype.list = function (request, response) {
    return response.promise(this.settingService.list(request.sequelizeQuery));
};

module.exports = SettingController;
