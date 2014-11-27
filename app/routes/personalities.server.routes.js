'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var personalities = require('../../app/controllers/personalities');

	// Personalities Routes
	app.route('/personalities')
		.get(personalities.list)
		.post(users.requiresLogin, personalities.create);

	app.route('/personalities/:personalityId')
		.get(personalities.read)
		.put(users.requiresLogin, personalities.hasAuthorization, personalities.update)
		.delete(users.requiresLogin, personalities.hasAuthorization, personalities.delete);

	// Finish by binding the Personality middleware
	app.param('personalityId', personalities.personalityByID);
};