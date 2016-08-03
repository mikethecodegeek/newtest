var mongoose = require('mongoose');
var moment = require('moment');

var Schema = mongoose.Schema;

var deviceBrandSchema = new mongoose.Schema({
    name: {type: String},
    imgurl: {type: String},
    devicetype: {type: String},
    models: [{ type: Schema.Types.ObjectId, ref: 'DeviceModels' }]
});

var deepPopulate = require('mongoose-deep-populate')(mongoose);
deviceBrandSchema.plugin(deepPopulate);

var Brands = mongoose.model('Brands', deviceBrandSchema);

module.exports = Brands;