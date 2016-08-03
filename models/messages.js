/**
 * Created by Admin on 6/13/16.
 */
var mongoose = require('mongoose');
var moment = require('moment');
var User = require('./user');

var messageSchema = new mongoose.Schema({
    message: {type: String},
    user: {type: Object}
});


var Messages = mongoose.model('Messages', messageSchema);

module.exports = Messages;