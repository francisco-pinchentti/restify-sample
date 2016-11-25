var BookmarkService = function (bookmarkModel) {
    this.bookmarkModel = bookmarkModel;
};

BookmarkService.prototype.create = function (url, description) {
	return this.bookmarkModel.build({
		description: description,
		url: url
	}).save();
};

module.exports = BookmarkService;
