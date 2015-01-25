'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var characters = require('../../app/controllers/characters');

	// Characters Routes
	app.route('/characters')
		.get(characters.list)
		.post(users.requiresLogin, characters.create);

	app.route('/characters/:characterId')
		.get(characters.read)
		.put(users.requiresLogin, characters.hasAuthorization, characters.update)
		.delete(users.requiresLogin, characters.hasAuthorization, characters.delete);

    app.route('/charactersPersonality/:personalShort')
        .get(characters.read_P);
    app.route('/charactersRace/:raceShort')
        .get(characters.read_R);
    app.route('/charactersJob/:jobShort')
        .get(characters.read_J);

	// Finish by binding the Character middleware
    app.param('characterId', characters.characterByID);
    app.param('personalShort', characters.personalityByShort);
    app.param('raceShort', characters.raceByShort);
    app.param('jobShort', characters.jobByShort);
};