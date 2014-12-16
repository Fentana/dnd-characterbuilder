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
    short: {
        type: String,
        default: ''
    },
    name: {
        type: String,
        default: ''
    },
    profile_image: {
        type: String
    },
    descriptors: {
        type: [{
            title: { type: String },
            desc: { type: String }
        }],
        default: []   // title & text per element
    },
    enhancers: {
        // mixed nested
        //default: null
        any: Schema.Types.Mixed
    },
    attribute_bonuses: {
        str: 0,
        dex: 0,
        con: 0,
        int: 0,
        wis: 0,
        cha: 0
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