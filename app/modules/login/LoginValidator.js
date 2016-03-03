var Joi = require('joi');

module.exports = {
    create: {
        body: {
            email: Joi.string().email().required(),
			password: Joi.string().required()
        }
    }
};
