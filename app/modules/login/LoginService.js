const MOCK_TOKEN = 'xzKyP1';

class LoginService {

    constructor (loginModel, userModel) {
        this.loginModel = loginModel;
        this.userModel = userModel;
    }

    login (email, password) {
        return this.userModel.findOne({
                where: {
                    email: email,
                    password: password
                }
        })
        .then((user) => {
            if (user) {
                return this.loginModel
                  .build({
                      email: user.email,
                      token: MOCK_TOKEN
                  })
                  .save();
            }
            // TODO see error classes
            throw new Error('Invalid login');
        });
    }

}

module.exports = LoginService;
