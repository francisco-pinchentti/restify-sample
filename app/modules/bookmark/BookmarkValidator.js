var Joi = require('joi');

module.exports = {
    create: {
        body: {
            url: Joi.string().required(),
			description: Joi.string()
        }
    },
	update: {
		params: {
			id: Joi.string()
		},
		body: {
			description: Joi.string()
		}
	}
};
