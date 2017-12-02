/**
 * Rest API sample with restify + sequelizeJS
 * @module main
 */

const config = require('./config.json');

if (!!config.logging.econsole) {
  require('econsole').enhance(config.logging.econsole);
}

const _ = require('lodash');
const restify = require('restify');
let server = restify.createServer();

// 1. db setup:

let db = require('./lib/db.js')(config.sequelize); // init connection
// TODO check app config for sync params
db
    .sequelize
    .query('SET FOREIGN_KEY_CHECKS = 0', {raw: true})
    .then(() => {
        db.sequelize
        .sync({ force: true })
        .then( () => require('./lib/initialDataLoad')(db) );
    });

// 2. general server setup:
const middlewares = require('./lib/middlewares');

server
    .use(restify.queryParser({ mapParams: false }))
    .use(restify.gzipResponse())
    .use(restify.bodyParser({ mapParams: false }))
    .use(middlewares.promiseMiddleware);

// 3. application routes setup:

var passport = require('passport');
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var opts = {};
opts.jwtFromRequest = ExtractJwt.fromHeader('authorization');
opts.secretOrKey = config.auth.secret;
opts.jsonWebTokenOptions = config.auth.options;

passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    db.applicationModels.user
      .findOne({ where: { email: jwt_payload.sub } })
      .then(function (user) {
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    });
}));

const applicationModules = require('./app/modules')(db);
require('./lib/setupRouting')(server, applicationModules, passport);

// 4. setting up info endpoint:
const ROUTES = _.map(server.router.mounts, (route) => {
    return {
        name: route.spec.name,
        path: route.spec.path,
        method: route.spec.method
    };
});
ROUTES.push({ name: '', path: config.restify.baseUrl, method: 'GET' });
server.get(config.restify.baseUrl, (request, response) => response.json(ROUTES));

// 5. log endpoint table:
if (!config.logging.econsole) {
  require('./lib/listEndpoints')(server.router.mounts);
}

// 6. start:
server.listen(config.restify.port);
console.info(`Server listening in: http://${config.restify.path}:${config.restify.port}`);
