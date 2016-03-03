module.exports = function (db) {

    return {
        user : require('./user')(db),
        login: require('./login')(db)
    };
};
