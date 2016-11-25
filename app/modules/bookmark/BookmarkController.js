var BookmarkController = function (bookmarkService) {
    this.bookmarkService = bookmarkService;
};

BookmarkController.prototype.create = function (request, response) {
    return response.promise(this.bookmarkService.create(request.body.url, request.body.description));
};

BookmarkController.prototype.update = function (request, response) {
    return response.promise(this.bookmarkService.update(request.params.id, request.body.url, request.body.description));
};

module.exports = BookmarkController;
