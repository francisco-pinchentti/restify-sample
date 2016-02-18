var Joi = require('joi');

module.exports = {
  get : {
      params: {
          id: Joi.string()
      }
  },
  list: {
      query: {
          test: Joi.object().keys({
                a: Joi.number(),
                b: Joi.string()
            })
      }
  }
};
