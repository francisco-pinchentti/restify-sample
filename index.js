require('econsole').enhance({ level: 'TRACE', file: true});
var _ = require('lodash');
var restify = require('restify');
var settings = require('./config.json');

// loads server components:
var server = restify.createServer();

// initialize database connection
var db = require('./lib/db.js')(settings.sequelize);

 // TODO force based on config env
db.sequelize.sync({ force: true })
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
    .use(restify.queryParser())
    .use(restify.gzipResponse())
    .use(restify.bodyParser())
    .use(promiseMiddleware);

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
