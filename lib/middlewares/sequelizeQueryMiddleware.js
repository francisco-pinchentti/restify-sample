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
module.exports = (request, response, next) => {

	// since Joi validators has default will never be empty:
	if (!_.isEmpty(request.query)) {
		// TODO multiple orders can be supported
		const order = [
			[
				request.query.order,
				(request.query.asc) ? 'ASC' : 'DESC'
			]
		];
		request.sequelizeQuery = {
			findAll: {
				limit: request.query.limit,
				offset: request.query.offset,
				where: _.omit(request.query, ['limit', 'offset', 'order', 'asc']),
				order: order
				// for *attributes* let each response handler decide which ones to expose
			}
		};
	}

    return next();
};
