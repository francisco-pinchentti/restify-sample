var Joi = require('joi');

module.exports = {
    list: {
        query: {
            name: Joi.string().max(64),
            order: Joi.string().default('id'),
            asc: Joi.boolean().default(true),
            limit: Joi.number().min(1).default(10),
            offset: Joi.number().min(0).default(0)
        }
    },
    create: {
        body: {
            name: Joi.string().max(64).required(),
            thumbnailUrl:  Joi.string().max(255),
			isPinned: Joi.boolean(),
			genres: Joi.array().items([Joi.number()])
        }
    }
};
