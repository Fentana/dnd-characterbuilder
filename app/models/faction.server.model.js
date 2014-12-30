'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Faction Schema
 */
var FactionSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Faction name',
		trim: true
	},
    banner_image: {
        type: String
    },
    motto: {
        type: String
    },
    alignments: {
        type: String
    },
    join_requirements: {
        type: Array // text desc of what character needs to do/have to join
    },
    attitudes: {
        type: [{
            title: {type: String},
            desc: {type: String}
        }]   //just multiple text descriptions
    },
    ranks: {
        type: [{
            renown: {type: Number},
            title: {type: String},
            perk: {type: String}
        }]
    },
	created: {
		type: Date,
		default: Date.now
	},
});

mongoose.model('Faction', FactionSchema);