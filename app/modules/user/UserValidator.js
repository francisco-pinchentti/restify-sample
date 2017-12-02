const Joi = require('joi');

module.exports = {
    get: {
        params: {
            id: Joi.number()
        }
    },
    list: {
        query: {
            firstname: Joi.string().max(64),
            lastname: Joi.string().max(64),
            email: Joi.string().email(),
            order: Joi.string().default('id'),
            asc: Joi.boolean().default(true),
            limit: Joi.number().min(1).default(10),
            offset: Joi.number().min(0).default(0)
        }
    },
    create: {
        body: {
            firstname: Joi.string().max(64).required(),
            lastname: Joi.string().max(64).required(),
            email: Joi.string().email().required(),
            workphone: Joi.string().max(64),
            homephone: Joi.string().max(64),
            birthdate: Joi.date().format('YYYY-MM-DD')
        }
    }
};
