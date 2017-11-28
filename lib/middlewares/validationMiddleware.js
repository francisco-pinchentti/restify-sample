const Joi = require('joi');
const _ = require('lodash');

/**
* Provides a middleware to perform joi validations on incoming requests.
*
* @module validationMiddleware
* @param {string} validationSchema - Validation rules to be used on an incoming request.
*/
module.exports = function (validationSchema) {
    return function (request, response, next) {
        var fieldsToValidate = _.pick(request, _.keys(validationSchema));
        Joi.validate(fieldsToValidate, validationSchema, function(err, result) {
            if (err) {
                return next(err); // TODO use some error classes
            }else{
                // joi validations may be used to set default values,
                // so override request values with validation result values:
                request.params = result.params;
                request.query = result.query;
                request.body = result.body;
                return next();
            }
        });
    };
};
