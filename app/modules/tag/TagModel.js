module.exports = function (sequelize, DataTypes) {

	/**
	 * @class TagModel
	 * @memberof modules.tag
	 */
	var TagModel = sequelize.define('tag', {
		name: DataTypes.STRING,
		description: DataTypes.STRING
	});

	/**
	 * Used after models have been loaded to set up relationships
	 *
	 * @method associate
	 * @memberof modules.tag.TagModel
	 * @param {object} db
	 * @see {@link http://docs.sequelizejs.com/en/v3/docs/associations/}
	 */
	TagModel.associate = function (db) {
        this.belongsToMany(db.bookmark, { through: 'bookmarks_tags' });
    };

	return TagModel;

};
