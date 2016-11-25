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
			id: Joi.number().required()
		},
		body: {
			description: Joi.string(),
			tags: Joi.array().items(Joi.number())
		}
	}
};
