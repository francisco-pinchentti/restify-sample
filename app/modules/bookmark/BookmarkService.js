var BookmarkService = function (bookmarkModel) {
    this.bookmarkModel = bookmarkModel;
};

BookmarkService.prototype.create = function (url, description) {
	return this.bookmarkModel.build({
		description: description,
		url: url
	}).save();
};

BookmarkService.prototype.update = function (id, url, description) {
	return this.bookmarkModel.findOne({
		where: {
			id: id
		}
	}).then( (bm) => {
		bm.update({
			url: url,
			description: description
		});
	});
};

module.exports = BookmarkService;
