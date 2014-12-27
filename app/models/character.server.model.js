'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Character Schema
 */
var CharacterSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Character name',
		trim: true
	},
    gender: {
        type: String
    },
    lvl: {
        type: Number,
        default: 1
    },
    alignment:{
        type: String
    },
    attributes: {
        str: { type: Number },
        dex: { type: Number },
        con: { type: Number },
        int: { type: Number },
        wis: { type: Number },
        cha: { type: Number }
    },
    race: {
        type: String  //contains short from Races
    },
    job: {
        type: String  //contains short from Jobs
    },
    persona:{
        type: String  //contains short from Personality
    },
	created: {
		type: Date,
		default: Date.now
	}
});

mongoose.model('Character', CharacterSchema);