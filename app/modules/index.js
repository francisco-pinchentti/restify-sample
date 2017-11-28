/**
 * @namespace app
 */
module.exports = function (db) {

    return {
          login: require('./login')(db),
          user: require('./user')(db)
    };
};
