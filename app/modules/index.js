module.exports = function (db) {

  return {
    user : require('./user')(db)
  };
};
