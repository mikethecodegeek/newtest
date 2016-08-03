/**
 * Created by Admin on 6/13/16.
 */
'use strict';

var mongoose = require('mongoose');
var moment = require('moment');
var User = require('./user');

var quoteSchema = new mongoose.Schema({
    username: {type: String},
    amount: { type: Number, required: true },
    device: { type: String, required: true },
    status: { type: String, default: 'Pending'},
    condition: {type: String},
    date: { type: String},
    paymentmethod: {type: String}
});


var Quotes = mongoose.model('Quotes', quoteSchema);

module.exports = Quotes;
