'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors'),
	Personality = mongoose.model('Personality'),
	_ = require('lodash');

/**
 * Create a Personality
 */
exports.create = function(req, res) {
	var personality = new Personality(req.body);
	personality.user = req.user;

	personality.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(personality);
		}
	});
};

/**
 * Show the current Personality
 */
exports.read = function(req, res) {
	res.jsonp(req.personality);
};

/**
 * Update a Personality
 */
exports.update = function(req, res) {
	var personality = req.personality ;

	personality = _.extend(personality , req.body);

	personality.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(personality);
		}
	});
};

/**
 * Delete an Personality
 */
exports.delete = function(req, res) {
	var personality = req.personality ;

	personality.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(personality);
		}
	});
};

/**
 * List of Personalities
 */
exports.list = function(req, res) { Personality.find().sort('-created').populate('user', 'displayName').exec(function(err, personalities) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(personalities);
		}
	});
};

/**
 * Personality middleware
 */
exports.personalityByID = function(req, res, next, id) { Personality.findById(id).populate('user', 'displayName').exec(function(err, personality) {
		if (err) return next(err);
		if (! personality) return next(new Error('Failed to load Personality ' + id));
		req.personality = personality ;
		next();
	});
};

/**
 * Personality authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.personality.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};