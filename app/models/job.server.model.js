'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Job Schema
 */
var JobSchema = new Schema({
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
    hit_die: {
        type: Number
    },
    descriptors: {
        type: Array,
        default: []   // title & text per element
    },
    primary_attr: {
        type: Array
    },
    saving_throws: {
        type: Array
    },
    equipment_profiencies: {
        type: Array
    },
    skills: {
        type: Array
    },
    skill_count: {
        type: Number
    },
    starting_package: {
        type: Array   // array of arrays, inner array is selectable
    },
    level_enhancers: {
        type: Array
    }

});

mongoose.model('Job', JobSchema);