class SettingController {

    constructor (settingService) {
        this.settingService = settingService;
    }

    list (request, response) {
        return response.promise(this.settingService.list(request.sequelizeQuery));
    }

}

module.exports = SettingController;
