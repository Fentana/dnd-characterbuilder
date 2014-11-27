'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Personality Schema
 */
var PersonalitySchema = new Schema({
    short: {
        type: String,
        default: ''
    },
    name: {
		type: String,
		default: '',
		required: 'Please fill Personality name',
		trim: true
	},
    feature: {
        any: Schema.Types.Mixed
    },
    descriptors: {
        type: Array,
        default: []   // title & text per element
    },
    speciality: {
        type: Array
    },
    skills: {
        type: Array
    },
    tools: {
        type: Array
    },
    equipment: {
        type: Array
    },
    traits: {
        type: Array
    },
    ideals: {
        type: Array
    },
    bonds: {
        type: Array
    },
    flaws: {
        type: Array
    }
});

mongoose.model('Personality', PersonalitySchema);