'use strict';

var mongoose = require('mongoose'),
    Character = mongoose.model('Character');

/**
 * Module dependencies.
 */
exports.index = function(req, res) {
	res.render('index', {
		user: req.user || null
	});
};


exports.read_Chrtr = function(req, res) {
    res.jsonp(req.character);
};

/**
 * Character middleware
 */
exports.characterByOwner = function(req, res, next, qy) { Character.findOne({ owner : qy }).exec(function(err, character) {
    if (err) return next(err);
    if (! personality) return next(new Error('Bad Query: Failed to load Character owned by ' + qy));
    req.character = character ;
    next();
});
};