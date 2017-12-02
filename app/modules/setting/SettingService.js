let SettingService = function (settingModel) {
    this.settingModel = settingModel;
};

SettingService.prototype.list = function () {
    return this.settingModel.findOne();
};

module.exports = SettingService;
