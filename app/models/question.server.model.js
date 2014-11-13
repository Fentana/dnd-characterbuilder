'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Question Schema
 */
var QuestionSchema = new Schema({
	order: {
        type: Number
    },
    text: {
		type: String,
		default: ''
	},
    answers: {
        type: Array
       /*
        test: {},
        impacts: {
            type: Array
        },
        lead_to: {
            type: Schema.ObjectId,
            ref: 'Question'
        }*/
    },
    support_image: {
        type: String,
        default: null
    }
});

mongoose.model('Question', QuestionSchema);