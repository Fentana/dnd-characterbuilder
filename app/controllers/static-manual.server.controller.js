'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    errorHandler = require('./errors'),
    Race = mongoose.model('Race'),
    _ = require('lodash');

/**
 * Create a Static manual
 */
exports.create = function(req, res) {

};

/**
 * Show the current Static manual
 */
exports.read = function(req, res) {

};


/**
 * List of Static manuals
 */
exports.list_races = function(req, res) { Race.find().exec(function(err, races) {
    if (err) {
        return res.status(400).send({
            message: errorHandler.getErrorMessage(err)
        });
    } else {
        res.jsonp(races);
    }
});
};