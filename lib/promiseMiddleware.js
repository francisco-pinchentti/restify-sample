/**
* This middleware adds "something like" a promise-resolver object to the
* response object.
* When that function gets invoked the promise result will be used to populate
* the response and send it as json.
*
* Credits to:
* @see {@link http://first-time-ceo.tumblr.com/post/104273001643/using-promises-with-expressjs}
*
* @module promiseMiddleware
*
* @param {object} request - Standard restify request object
* @param {object} response - Standard restify response object
* @param {function} next -  Standard restify next function
*/
module.exports = function (request, response, next) {
    response.promise = function (promise) {
        promise
        .then(function(result) {
            response.json(result);
        })
        .catch(function(error) {
            console.error(error);
            response.json(error);
        });
    };

    return next();
};
