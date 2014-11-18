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
//	order: {
//        type: Number
//    },
    text: {
		type: String,
		default: ''
	},
    answers: [
        {
            text: { type: String },
            impacts: [
                {
                    category: { type: String },
                    value: { type: String },
                    weight: { type: Number }
                }
            ],
            lead_to: {
                type: String,
                //type: Schema.ObjectId,    ////Not able to take from form....mongoose casting issue
                //ref: 'Question',
                default: null
            }
        }
    ],
    support_image: {
        type: String,
        default: null
    }
});

mongoose.model('Question', QuestionSchema);