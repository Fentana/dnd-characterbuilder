'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Faction = mongoose.model('Faction'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, faction;

/**
 * Faction routes tests
 */
describe('Faction CRUD tests', function() {
	beforeEach(function(done) {
		// Create user credentials
		credentials = {
			username: 'username',
			password: 'password'
		};

		// Create a new user
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: credentials.username,
			password: credentials.password,
			provider: 'local'
		});

		// Save a user to the test db and create new Faction
		user.save(function() {
			faction = {
				name: 'Faction Name'
			};

			done();
		});
	});

	it('should be able to save Faction instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Faction
				agent.post('/factions')
					.send(faction)
					.expect(200)
					.end(function(factionSaveErr, factionSaveRes) {
						// Handle Faction save error
						if (factionSaveErr) done(factionSaveErr);

						// Get a list of Factions
						agent.get('/factions')
							.end(function(factionsGetErr, factionsGetRes) {
								// Handle Faction save error
								if (factionsGetErr) done(factionsGetErr);

								// Get Factions list
								var factions = factionsGetRes.body;

								// Set assertions
								(factions[0].user._id).should.equal(userId);
								(factions[0].name).should.match('Faction Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Faction instance if not logged in', function(done) {
		agent.post('/factions')
			.send(faction)
			.expect(401)
			.end(function(factionSaveErr, factionSaveRes) {
				// Call the assertion callback
				done(factionSaveErr);
			});
	});

	it('should not be able to save Faction instance if no name is provided', function(done) {
		// Invalidate name field
		faction.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Faction
				agent.post('/factions')
					.send(faction)
					.expect(400)
					.end(function(factionSaveErr, factionSaveRes) {
						// Set message assertion
						(factionSaveRes.body.message).should.match('Please fill Faction name');
						
						// Handle Faction save error
						done(factionSaveErr);
					});
			});
	});

	it('should be able to update Faction instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Faction
				agent.post('/factions')
					.send(faction)
					.expect(200)
					.end(function(factionSaveErr, factionSaveRes) {
						// Handle Faction save error
						if (factionSaveErr) done(factionSaveErr);

						// Update Faction name
						faction.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Faction
						agent.put('/factions/' + factionSaveRes.body._id)
							.send(faction)
							.expect(200)
							.end(function(factionUpdateErr, factionUpdateRes) {
								// Handle Faction update error
								if (factionUpdateErr) done(factionUpdateErr);

								// Set assertions
								(factionUpdateRes.body._id).should.equal(factionSaveRes.body._id);
								(factionUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Factions if not signed in', function(done) {
		// Create new Faction model instance
		var factionObj = new Faction(faction);

		// Save the Faction
		factionObj.save(function() {
			// Request Factions
			request(app).get('/factions')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Faction if not signed in', function(done) {
		// Create new Faction model instance
		var factionObj = new Faction(faction);

		// Save the Faction
		factionObj.save(function() {
			request(app).get('/factions/' + factionObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', faction.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Faction instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Faction
				agent.post('/factions')
					.send(faction)
					.expect(200)
					.end(function(factionSaveErr, factionSaveRes) {
						// Handle Faction save error
						if (factionSaveErr) done(factionSaveErr);

						// Delete existing Faction
						agent.delete('/factions/' + factionSaveRes.body._id)
							.send(faction)
							.expect(200)
							.end(function(factionDeleteErr, factionDeleteRes) {
								// Handle Faction error error
								if (factionDeleteErr) done(factionDeleteErr);

								// Set assertions
								(factionDeleteRes.body._id).should.equal(factionSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Faction instance if not signed in', function(done) {
		// Set Faction user 
		faction.user = user;

		// Create new Faction model instance
		var factionObj = new Faction(faction);

		// Save the Faction
		factionObj.save(function() {
			// Try deleting Faction
			request(app).delete('/factions/' + factionObj._id)
			.expect(401)
			.end(function(factionDeleteErr, factionDeleteRes) {
				// Set message assertion
				(factionDeleteRes.body.message).should.match('User is not logged in');

				// Handle Faction error error
				done(factionDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Faction.remove().exec();
		done();
	});
});