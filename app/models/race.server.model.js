'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Race Schema  (includes expansions as sub races, but not required)
 */
var RaceSchema = new Schema({
    name: {
        type: String,
        default: ''
    },
    profile_image: {
        type: String
    },
    descriptors: {
        type:Array,
        default: []   // title & text per element
    }
});

mongoose.model('Race', RaceSchema);