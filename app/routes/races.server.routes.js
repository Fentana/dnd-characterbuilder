'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var races = require('../../app/controllers/races');

	// Races Routes
	app.route('/races')
		.get(races.list)
		.post(users.requiresLogin, races.create);

	app.route('/races/:raceId')
		.get(races.read)
		.put(users.requiresLogin, races.hasAuthorization, races.update)
		.delete(users.requiresLogin, races.hasAuthorization, races.delete);

	// Finish by binding the Race middleware
	app.param('raceId', races.raceByID);
};