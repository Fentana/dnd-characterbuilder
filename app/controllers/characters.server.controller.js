'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors'),
    Character = mongoose.model('Character'),
    Personality = mongoose.model('Personality'),
    Race = mongoose.model('Race'),
    Job = mongoose.model('Job'),
	_ = require('lodash');

/**
 * Create a Character
 */
exports.create = function(req, res) {
	var character = new Character(req.body);
	character.owner = req.user;

	character.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(character);
		}
	});
};

/**
 * Show the current Character
 */
exports.read = function(req, res) {
	res.jsonp(req.character);
};

/**
 * Update a Character
 */
exports.update = function(req, res) {
	var character = req.character ;

	character = _.extend(character , req.body);

	character.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(character);
		}
	});
};

/**
 * Delete an Character
 */
exports.delete = function(req, res) {
	var character = req.character ;

	character.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(character);
		}
	});
};

/**
 * List of Characters
 */
exports.list = function(req, res) { Character.find().sort('-created').populate('user', 'displayName').exec(function(err, characters) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(characters);
		}
	});
};

/**
 * Character middleware
 */
exports.characterByID = function(req, res, next, id) { Character.findById(id).populate('user', 'displayName').exec(function(err, character) {
		if (err) return next(err);
		if (! character) return next(new Error('Failed to load Character ' + id));
		req.character = character ;
		next();
	});
};


/**
 * Show the requested Personality
 */
exports.read_P = function(req, res) {
    res.jsonp(req.personality);
};
exports.read_R = function(req, res) {
    res.jsonp(req.race);
};
exports.read_J = function(req, res) {
    res.jsonp(req.job);
};

/**
 * Character middleware
 */
exports.personalityByShort = function(req, res, next, qy) { Personality.findOne({ short : qy }).exec(function(err, personality) {
    if (err) return next(err);
    if (! personality) return next(new Error('Bad Query: Failed to load personality ' + qy));
    req.personality = personality ;
    next();
});
};

exports.raceByShort = function(req, res, next, qy) { Race.findOne({ short : qy }).exec(function(err, race) {
    if (err) return next(err);
    if (! race) return next(new Error('Bad Query: Failed to load race ' + qy));
    req.race = race ;
    next();
});
};

exports.jobByShort = function(req, res, next, qy) { Job.findOne({ short : qy }).exec(function(err, job) {
    if (err) return next(err);
    if (! job) return next(new Error('Bad Query: Failed to load class ' + qy));
    req.job = job ;
    next();
});
};


/**
 * Character authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.character.owner.id !== req.user.id) {
		return res.status(403).send('User '+req.user.username+' is not authorized');
	}
	next();
};


var getRace = function(r) {
    return Race.findOne({ short : r }).exec(function(err, race) {
        if (err) return next(err);
        return race
    });
}
