module.exports = function (db) {

    db.user.build({
        firstname: 'John',
        lastname: 'Doe',
        email: 'john@doe.com',
        password: '12345'
    }).save();

    db.user.build({
        firstname: 'Jane',
        lastname: 'Doe',
        email: 'jane@doe.com',
        password: '54321'
    }).save();

}