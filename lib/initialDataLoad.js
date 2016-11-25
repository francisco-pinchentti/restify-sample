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

	db.bookmark.build({
		description: 'Google!',
		url: 'www.google.com'
	}).save();

	db.tag.build({
		name: 'search engine',
		description: ''
	}).save();

	db.tag.build({
		name: 'news portal',
		description: 'new feeds and/or portals'
	}).save();

};
