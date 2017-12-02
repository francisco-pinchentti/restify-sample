class SettingService {

    constructor (settingModel) {
        this.settingModel = settingModel;
    }

    list () {
        return this.settingModel.findOne();
    }
}

module.exports = SettingService;
