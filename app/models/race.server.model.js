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
        type: Array,
        default: []   // title & text per element
    },
    enhancers: {
        type: Array,
        default: []
    },
    speed: {
        type: Number
    },
    size: {
        type: String
    },
    age: {
        type: String
    },
    languages: {
        type: Array,
        default: []
    }
//    subRaces: {
//                    should they be seperate or just noted in the "enhancers"
//    }

});

mongoose.model('Race', RaceSchema);