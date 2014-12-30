'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Faction = mongoose.model('Faction'),
	_ = require('lodash'),
    fs = require('fs'),
    path = require('path');

/**
 * Create a Faction
 */
exports.create = function(req, res) {
	var faction = new Faction(req.body);
	faction.user = req.user;

	faction.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(faction);
		}
	});
};

/**
 * Show the current Faction
 */
exports.read = function(req, res) {
	res.jsonp(req.faction);
};

/**
 * Update a Faction
 */
exports.update = function(req, res) {
	var faction = req.faction ;

	faction = _.extend(faction , req.body);

	faction.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(faction);
		}
	});
};

/**
 * Delete an Faction
 */
exports.delete = function(req, res) {
	var faction = req.faction ;

	faction.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(faction);
		}
	});
};

/**
 * List of Factions
 */
exports.list = function(req, res) { 
	Faction.find().sort('-created').populate('user', 'displayName').exec(function(err, factions) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(factions);
		}
	});
};

/**
 * Faction middleware
 */
exports.factionByID = function(req, res, next, id) { 
	Faction.findById(id).populate('user', 'displayName').exec(function(err, faction) {
		if (err) return next(err);
		if (! faction) return next(new Error('Failed to load Faction ' + id));
		req.faction = faction ;
		next();
	});
};


/**
 *  Get a list of the possible images in the faction img dir.
 */
exports.possibleImages = function(req, res) {
    fs.readdir(path.join(__dirname, '../../public/modules/factions/img'), function(err, files) {
        var data = files.filter(function(file) { return file.substr(0,1) !== '.'; })
        res.json(data || err);
    });

  /*  fs.readdir(p, function (err, files) {
        if (err) {
            throw err;
        }

        files.map(function (file) {
            return path.join(p, file);
        }).filter(function (file) {
                return fs.statSync(file).isFile();
            }).forEach(function (file) {
                console.log("%s (%s)", file, path.extname(file));
            });
    })*/
};


/**
 * Faction authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	/*if (req.faction.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}*/
	next();
};
