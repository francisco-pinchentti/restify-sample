var LoginService = function (loginModel, userModel) {
    this.loginModel = loginModel;
    this.userModel = userModel;
};

const MOCK_TOKEN = 'xzKyP1';

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
            return self.loginModel
              .build({
                  email: user.email,
                  token: MOCK_TOKEN
              })
              .save();
        }
        throw new Error('Invalid login');
    });
};

module.exports = LoginService;
