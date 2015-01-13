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
        str: { type: Number, default: 8 },
        dex: { type: Number, default: 8 },
        con: { type: Number, default: 8 },
        int: { type: Number, default: 8 },
        wis: { type: Number, default: 8 },
        cha: { type: Number, default: 8 }
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
    firstEdit:{
        default: false
    },
    owner: {
        type: Schema.ObjectId,
        ref: 'User',
        defualt: null
    },
	created: {
		type: Date,
		default: Date.now
	}
});

mongoose.model('Character', CharacterSchema);