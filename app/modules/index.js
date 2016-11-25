/**
 * @namespace modules
 */
/**
* @namespace tag
* @memberof modules
*/
module.exports = function (db) {

    return {
		bookmark: require('./bookmark')(db),
        login: require('./login')(db),
		user: require('./user')(db)
    };
};
