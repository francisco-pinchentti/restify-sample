class UserService {

    constructor (userModel) {
        this.userModel = userModel;
    }

    list (query) {
        query.findAll.attributes = [ 'id', 'firstname', 'lastname', 'email' ];
        return this.userModel.findAll(query.findAll);
    }

    create (newUserData) {
        return this.userModel.build(newUserData).save();
    }
}

module.exports = UserService;
