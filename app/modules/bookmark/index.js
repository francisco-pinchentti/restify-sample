var BookmarkService = require('./BookmarkService');
var BookmarkController = require('./BookmarkController');

module.exports = function (db) {
    var bookmarkService = new BookmarkService(db.bookmark);
    var bookmarkController = new BookmarkController(bookmarkService);
    var bookmarkValidator = require('./BookmarkValidator');

    return {
        controller: bookmarkController,
        service: bookmarkService,
        validator: bookmarkValidator,
        resourceRoute: '/bookmark'
    };
};
