'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var factions = require('../../app/controllers/factions.server.controller');

	// Factions Routes
	app.route('/factions')
		.get(factions.list)
		.post(users.requiresLogin, factions.create);

	app.route('/factions/:factionId')
		.get(factions.read)
		.put(users.requiresLogin, factions.hasAuthorization, factions.update)
		.delete(users.requiresLogin, factions.hasAuthorization, factions.delete);

    app.route('/faction_images')
        .get(factions.possibleImages);

	// Finish by binding the Faction middleware
	app.param('factionId', factions.factionByID);
};
