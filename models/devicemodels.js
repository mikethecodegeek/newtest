/**
 * Created by Admin on 6/18/16.
 */
var mongoose = require('mongoose');
var moment = require('moment');

var Schema = mongoose.Schema;

var deviceModelSchema = new mongoose.Schema({
    name: {type: String},
    imgurl: {type: String},
    devicetype: {type: String},
    brand: {type: String},
    versions: [{ type: Schema.Types.ObjectId, ref: 'Devices' }]
});


var DeviceModels = mongoose.model('DeviceModels', deviceModelSchema);

module.exports = DeviceModels;