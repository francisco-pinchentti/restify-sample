module.exports = function (sequelize, DataTypes) {

  let LoginModel = sequelize.define('login', {
    token: DataTypes.STRING
  });

  /**
  * Used after models have been loaded to set up relationships
  *
  * @method associate
  * @memberof modules.tag.LoginModel#
  * @param {object} db
  * @see {@link http://docs.sequelizejs.com/en/v3/docs/associations/}
  */
 LoginModel.associate = function (db) {
   this.belongsTo(db.applicationModels.user, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });
 };

 return LoginModel;

};
