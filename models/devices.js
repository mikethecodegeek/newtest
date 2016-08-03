
/**
 * Created by Admin on 6/13/16.
 */
var mongoose = require('mongoose');
var moment = require('moment');
var User = require('./user');

var deviceSchema = new mongoose.Schema({
    devicename: {type: String},
    description: { type: String },
    imgurl: {type: String},
    type: {type: String},
    brand: {type: String},
    model: {type: String},
    new: {type: Number},
    used: {type: Number},
    broken: {type: Number}
});


var Devices = mongoose.model('Devices', deviceSchema);

module.exports = Devices;
