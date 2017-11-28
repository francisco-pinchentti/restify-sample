/**
 * @module setupRouting
 */

const _ = require('lodash');
const config = require('../config.json');
const middlewares = require('../lib/middlewares');

module.exports = function (server, applicationModules) {

  _.forEach(applicationModules, function(aModule) {

      if (aModule.controller) {
          if (aModule.controller.get && aModule.validator.get) {
              server.get(
                  config.restify.baseUrl + aModule.resourceRoute + '/:id',
                  middlewares.validationMiddleware(aModule.validator.get),
                  aModule.controller.get.bind(aModule.controller)
              );
          }

          if (aModule.controller.delete && aModule.validator.delete) {
              server.del(
                  config.restify.baseUrl + aModule.resourceRoute + '/:id',
                  middlewares.validationMiddleware(aModule.validator.delete),
                  aModule.controller.delete.bind(aModule.controller)
              );
          }

          if (aModule.controller.update && aModule.validator.update) {
              server.put(
                  config.restify.baseUrl + aModule.resourceRoute + '/:id',
                  middlewares.validationMiddleware(aModule.validator.update),
                  aModule.controller.update.bind(aModule.controller)
              );
          }

          if (aModule.controller.create && aModule.validator.create) {
              server.post(
                  config.restify.baseUrl + aModule.resourceRoute,
                  middlewares.validationMiddleware(aModule.validator.create),
                  aModule.controller.create.bind(aModule.controller)
              );
          }

          if (aModule.controller.list && aModule.validator.list) {
              server.get(
                  config.restify.baseUrl + aModule.resourceRoute,
                  middlewares.validationMiddleware(aModule.validator.list),
                  middlewares.sequelizeQueryMiddleware,
                  aModule.controller.list.bind(aModule.controller)
              );
          }

      }

  });
}
