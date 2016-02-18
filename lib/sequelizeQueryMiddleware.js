var _ = require('lodash');

/**
 * This middleware parses the request.query object to create a new object
 * to be used easily with sequelize query methods.
 * This middleware needs to be hooked up after restify.queryParser middleware.
 *
 * @module sequelizeQueryMiddleware
 *
 * @param {object} request - Standard restify request object
 * @param {object} response - Standard restify response object
 * @param {function} next -  Standard restify next function
 */
module.exports = function (request, response, next) {

	if (!_.isEmpty(request.query)) {
		// TODO multiple orders can be supported
		var order = [
			[
				request.query.order,
				(request.query.asc) ? 'ASC' : 'DESC'
			]
		];
		request.sequelizeQuery = {
			findAll: {
				limit: request.query.limit,
				offset: request.query.offset,
				attributes: {
					exclude: ['id', 'createdAt', 'updatedAt']
				},
				where: _.omit(request.query, ['limit', 'offset', 'order', 'asc']),
				order: order
			}
		};
	}

    return next();
};
