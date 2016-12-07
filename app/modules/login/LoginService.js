var LoginService = function (loginModel, userModel) {
    this.loginModel = loginModel;
    this.userModel = userModel;
};

LoginService.prototype.login = function (email, password) {
    let self = this;
    return this.userModel.findOne({
            where: {
                email: email,
                password: password
            }
    })
    .then(function(user) {
        if (user) {
            return self.loginModel.build({ email: user.email}).save();
        }
        throw new Error('Invalid login');
    });
};

module.exports = LoginService;
