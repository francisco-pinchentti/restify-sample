/**
 * Rest API sample with restify
 * @module main
 */

const _ = require('lodash');
const restify = require('restify');
const config = require('./config.json');

if (!!config.logging.econsole) {
  require('econsole').enhance(config.logging.econsole);
}

// loads server components:
let server = restify.createServer();

// initialize database connection
let db = require('./lib/db.js')(config.sequelize);

// TODO check app config for sync params
db
    .sequelize
    .query('SET FOREIGN_KEY_CHECKS = 0', {raw: true})
    .then(function(results) {
        db.sequelize
        .sync({force: true})
        .then(function() {
          require('./lib/initialDataLoad')(db);
        });
    });

// load all application modules
var applicationModules = require('./app/modules')(db);

// set server moddlewares
const validationMiddleware = require('./lib/validationMiddleware');
const promiseMiddleware = require('./lib/promiseMiddleware');
const sequelizeQueryMiddleware = require('./lib/sequelizeQueryMiddleware');

server
    .use(restify.queryParser({ mapParams: false }))
    .use(restify.gzipResponse())
    .use(restify.bodyParser({ mapParams: false }))
    .use(promiseMiddleware);

// TODO move to a module
// bind routes (endpoints and validators) to server:
_.forEach(applicationModules, function(aModule) {

    if (aModule.controller) {
        if (aModule.controller.get && aModule.validator.get) {
            server.get(
                config.restify.baseUrl + aModule.resourceRoute + '/:id',
                validationMiddleware(aModule.validator.get),
                aModule.controller.get.bind(aModule.controller)
            );
        }

        if (aModule.controller.delete && aModule.validator.delete) {
            server.del(
                config.restify.baseUrl + aModule.resourceRoute + '/:id',
                validationMiddleware(aModule.validator.delete),
                aModule.controller.delete.bind(aModule.controller)
            );
        }

        if (aModule.controller.update && aModule.validator.update) {
            server.put(
                config.restify.baseUrl + aModule.resourceRoute + '/:id',
                validationMiddleware(aModule.validator.update),
                aModule.controller.update.bind(aModule.controller)
            );
        }

        if (aModule.controller.create && aModule.validator.create) {
            server.post(
                config.restify.baseUrl + aModule.resourceRoute,
                validationMiddleware(aModule.validator.create),
                aModule.controller.create.bind(aModule.controller)
            );
        }

        if (aModule.controller.list && aModule.validator.list) {
            server.get(
                config.restify.baseUrl + aModule.resourceRoute,
                validationMiddleware(aModule.validator.list),
                sequelizeQueryMiddleware,
                aModule.controller.list.bind(aModule.controller)
            );
        }

    }

});

// Info endpoint:
const ROUTES = _.map(server.router.mounts, (route) => { return {
    name: route.spec.name,
    path: route.spec.path,
    method: route.spec.method
    }});
ROUTES.push({name:'', path: config.restify.baseUrl, method: 'GET'});
server.get(config.restify.baseUrl, (request, response) => response.json(ROUTES))

if (!config.logging.econsole) {
  require('./lib/listEndpoints')(server.router.mounts)
}

server.listen(config.restify.port);
console.info(`Server listening in: http://${config.restify.path}:${config.restify.port}`);
