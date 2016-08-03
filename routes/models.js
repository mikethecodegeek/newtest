/**
 * Created by Admin on 6/18/16.
 */
var express = require('express');
var router = express.Router();
var DeviceModels = require('../models/devicemodels');
var request = require('request');
var Brands = require('../models/Brands');

router.get('/', (req,res)=> {
    DeviceModels.find({})
        .exec((err, data) => {
            if (err) {
                console.log(err)
            }
            else {
                res.send(data);
            }

        });
});

router.post('/newmodel', (req,res)=> {
     // console.log(req.body.model.brand);
    DeviceModels.create(req.body.model,(err, listing)=> {
        if (err){
            console.log(err);
            res.status(400).send(err)
        } else {
            Brands.findOne({name: req.body.model.brand, devicetype: req.body.type}, (err, brandname) => {
                console.log(brandname)
                if(err){res.send(err)}
                else {
                    brandname.models.push(listing._id);
                    brandname.save();
                    DeviceModels.find({})
                        .exec((err, data) => {
                            if (err) {
                                console.log(err)
                            }
                            else {
                                res.status(200).send(data);
                            }

                        });
                }
            });
    
        }
    });

});

router.get('/:id', (req,res)=> {
    DeviceModels.findById(req.params.id, (err,data) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send(data);
        }
    })
});


router.delete('/:id', (req,res)=> {
    DeviceModels.findByIdAndRemove(req.params.id, (err,data)=> {
        if (err){
            console.log(err);
        }
        else {
            res.send(data);
        }
    });
});

router.put('/:id', (req,res)=> {
    DeviceModels.findByIdAndUpdate(req.params.id,{$set: req.body}, {new:true}, (err,data)=> {
        if (err){
            console.log(err);
        }
        else {
            res.send(data);
        }
    });
});




module.exports = router;
