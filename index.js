/**
 * Rest API sample with restify
 * @module main
 */

// TODO load from config, conflicts with endpoints table display
// require('econsole').enhance({ level: 'TRACE', file: true});

const _ = require('lodash');
const restify = require('restify');
const settings = require('./config.json');

// loads server components:
var server = restify.createServer();

// initialize database connection
var db = require('./lib/db.js')(settings.sequelize);

db.sequelize.sync(settings.sequelize.sync)
.then(function(){
    console.log('Models synced');
    require('./lib/initialDataLoad')(db);
});

// load all application modules
var applicationModules = require('./app/modules')(db);

// set server moddlewares
var validationMiddleware = require('./lib/validationMiddleware');
var promiseMiddleware = require('./lib/promiseMiddleware');
var sqlQueryMiddleware = require('./lib/sequelizeQueryMiddleware');

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
                settings.restify.baseUrl + aModule.resourceRoute + '/:id',
                validationMiddleware(aModule.validator.get),
                aModule.controller.get.bind(aModule.controller)
            );
        }

        if (aModule.controller.delete && aModule.validator.delete) {
            server.del(
                settings.restify.baseUrl + aModule.resourceRoute + '/:id',
                validationMiddleware(aModule.validator.delete),
                aModule.controller.delete.bind(aModule.controller)
            );
        }

        if (aModule.controller.update && aModule.validator.update) {
            server.put(
                settings.restify.baseUrl + aModule.resourceRoute + '/:id',
                validationMiddleware(aModule.validator.update),
                aModule.controller.update.bind(aModule.controller)
            );
        }

        if (aModule.controller.create && aModule.validator.create) {
            server.post(
                settings.restify.baseUrl + aModule.resourceRoute,
                validationMiddleware(aModule.validator.create),
                aModule.controller.create.bind(aModule.controller)
            );
        }

        if (aModule.controller.list && aModule.validator.list) {
            server.get(
                settings.restify.baseUrl + aModule.resourceRoute,
                validationMiddleware(aModule.validator.list),
                sqlQueryMiddleware,
                aModule.controller.list.bind(aModule.controller)
            );
        }

    }

});
console.info('Server listening in: http://' + settings.restify.path + ':' + settings.restify.port);
server.listen(settings.restify.port);
require('./lib/listEndpoints')(server.router.mounts);
