'use strict';

var mongoose = require('mongoose');
var moment = require('moment');
var User = require('./user');

var listingSchema = new mongoose.Schema({
    user: {type: String},
    item: { type: String, required: true },
    pic: { type: String, required: true },
    description: { type: String, default: false },
   
});

listingSchema.statics.createListing = function(item, cb) {
 //  console.log("ITEM:", item.userid);
   var post = new Listing({
       user: item.user,
       item: item.item,
       pic: item.pic,
       description: item.description
   });
    post.save((err, savedPost) => {
        cb(err, savedPost);
        console.log('')
    });

}

var Listing = mongoose.model('Listing', listingSchema);

module.exports = Listing;

