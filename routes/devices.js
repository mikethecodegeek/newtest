/**
 * Created by Admin on 6/13/16.
 */
var express = require('express');
var router = express.Router();
var Devices = require('../models/devices');
var request = require('request');
var Model = require('../models/devicemodels');

router.get('/', (req,res)=> {
    Devices.find({})
        .exec((err, data) => {
            if (err) {
                console.log(err)
            }
            else {
                res.send(data);
            }

        });
});

router.post('/type', (req,res)=> {
   // console.log(req.body.type.devicetype)
    Devices.find({type:req.body.type.devicetype})
        .exec((err, data) => {
            if (err) {
                console.log(err)
                res.send(err)
            }
            else {
                res.send(data);
            }

        });
});

router.post('/newdevice', (req,res)=> {
    console.log(req.body.device);
    Devices.create(req.body.device,(err, listing)=> {
        if (err){
            console.log(err);
            res.status(400).send(err)
        } else {
            Model.findOne({name: req.body.model}, (err, model)=> {
                if(err){res.send(err)}
                else {
                    model.versions.push(listing._id);
                    model.save();
                    Devices.find({})
                        .exec((err, data) => {
                            if (err) {
                                console.log(err)
                            }
                            else {
                                res.status(200).send(data);
                            }

                        });
                }
            })
          
        }
    });

});

router.get('/:id', (req,res)=> {
    Devices.findById(req.params.id, (err,data) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send(data);
        }
    })
});


router.delete('/:id', (req,res)=> {
    Devices.findByIdAndRemove(req.params.id, (err,data)=> {
        if (err){
            console.log(err);
        }
        else {
            res.send(data);
        }
    });
});

router.put('/:id', (req,res)=> {
    Devices.findByIdAndUpdate(req.params.id,{$set: req.body}, {new:true}, (err,data)=> {
        if (err){
            console.log(err);
        }
        else {
            res.send(data);
        }
    });
});




module.exports = router;
