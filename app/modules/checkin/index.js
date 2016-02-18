var CheckinService = require('./CheckinService');
var CheckinController = require('./CheckinController');

module.exports = function (db) {
  var checkinModel = db.checkin;
  var checkinService = new CheckinService(checkinModel);
  var checkinController = new CheckinController(checkinService);
  var checkinValidator = require('./CheckinValidator');

  return {
    controller: checkinController,
    model: checkinModel,
    service: checkinService,
    validator: checkinValidator,
    resourceRoute: '/checkin'
  };
};
