var _ = require('lodash');

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
