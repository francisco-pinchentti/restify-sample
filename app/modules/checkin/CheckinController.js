var CheckinController = function (checkinService) {
  this.checkinService = checkinService;
};

CheckinController.prototype.list = function (request, response, next) {
    response.json({
        results: [ 1, 2 ],
        count: 2,
        query: 'q=str',
        nextPage: false
    });
};

CheckinController.prototype.get = function (request, response, next) {
    response.json({
        id: request.params.id
    });
};

CheckinController.prototype.create = function (request, response, next) {

};

CheckinController.prototype.update = function (request, response, next) {

};

module.exports = CheckinController;
