/**
 * @module middlewares
 */

const promiseMiddleware = require('./promiseMiddleware');
const sequelizeQueryMiddleware = require('./sequelizeQueryMiddleware');
const validationMiddleware = require('./validationMiddleware');

module.exports = {
  promiseMiddleware: promiseMiddleware,
  sequelizeQueryMiddleware: sequelizeQueryMiddleware,
  validationMiddleware: validationMiddleware
};
