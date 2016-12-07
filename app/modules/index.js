/**
 * @namespace app
 */
/**
* @namespace tag
* @memberof app
*/
module.exports = function (db) {

    return {
		bookmark: require('./bookmark')(db),
        login: require('./login')(db),
		user: require('./user')(db)
    };
};
