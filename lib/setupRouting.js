/**
 * @module setupRouting
 */

const _ = require('lodash');
const config = require('../config.json');
const middlewares = require('../lib/middlewares');

/**
 * Application controller methods constants
 */
const APP_VERBS_DICT = {
  GET: 'get',
  CREATE: 'create',
  DELETE: 'delete',
  PUT: 'put',
  LIST: 'list'
};

/**
 * Used to map an application controller method to a restify method
 */
const RESTIFY_VERB_MAPPING_DICT = {
  get: 'get',
  list: 'get',
  create: 'post',
  put:  'put',
  'delete': 'del'
};

function buildRestifyEndpointArgs(aModule, aMethod) {
  let argsArray = [];
  const path = (aMethod === APP_VERBS_DICT.GET || aMethod === APP_VERBS_DICT.PUT || aMethod === APP_VERBS_DICT.DELETE)
    ? config.restify.baseUrl + aModule.resourceRoute + '/:id'
    : config.restify.baseUrl + aModule.resourceRoute;
  argsArray.push(path);
  argsArray.push(middlewares.validationMiddleware(aModule.validator[aMethod]));
  if (aModule.secured) { // requiresAuth TODO
    argsArray.push(middlewares.authMiddleware(aModule.validator[aMethod]));
  }
  if (aMethod === APP_VERBS_DICT.LIST) {
    argsArray.push(middlewares.sequelizeQueryMiddleware);
  }
  argsArray.push(aModule.controller[aMethod].bind(aModule.controller));
  return argsArray;
}

/**
 * Iterates over an appilcation modules collection mounting all the endpoints found.
 * This function mutates it's argument.
 *
 * @param {object} server - a restify server object
 * @param {object[]} applicationModules - a collection of application modules
 * @returns {object}
 */
module.exports = function (server, applicationModules) {

  _.forEach(applicationModules, function(aModule) {

    if (aModule.controller) {

      _.forEach(APP_VERBS_DICT, function(appVerb) {
        if (aModule.controller[appVerb] && aModule.validator[appVerb]) {
          let endpointArgs = buildRestifyEndpointArgs(aModule, appVerb);
          let restifyVerb = RESTIFY_VERB_MAPPING_DICT[appVerb];
          console.info(`mounting route type ${appVerb} using restify ${restifyVerb}() on path: ${endpointArgs[0]}`);
          server[restifyVerb].apply(server, endpointArgs);
        }
      });

    }
  });

  return server;
}
