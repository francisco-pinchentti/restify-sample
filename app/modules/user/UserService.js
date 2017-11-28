var UserService = function (userModel) {
    this.userModel = userModel;
};

UserService.prototype.list = function (query) {
    query.findAll.attributes = [ 'id', 'firstname', 'lastname', 'email' ];
    return this.userModel.findAll(query.findAll);
};

// UserService.prototype.get = function (id) { };

UserService.prototype.create = function (newUserData) {
    return this.userModel.build(newUserData).save();
};

// UserService.prototype.delete = function (id) { };

// UserService.prototype.update = function (id, newData) { };

module.exports = UserService;
