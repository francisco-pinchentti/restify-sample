var BookmarkController = function (bookmarkService) {
    this.BookmarkService = bookmarkService;
};

BookmarkController.prototype.create = function (request, response) {
    return response.promise(this.bookmarkService.create(request.body.url, request.body.description));
};

module.exports = BookmarkController;
