/**
 * Created by Admin on 6/18/16.
 */
var express = require('express');
var router = express.Router();
var Brands = require('../models/Brands');
var DeviceTypes = require('../models/deviceTypes');


router.get('/', (req,res)=> {
    Brands.find({})
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
    Brands.find({devicetype:req.body.type.devicetype})
        .deepPopulate('models models.versions')
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

router.post('/newbrand', (req,res)=> {
    //console.log(req.body)
    Brands.create(req.body.brand,(err, listing)=> {
    //    console.log(listing)
        if (err){
            console.log(err);
            res.status(400).send(err)
        } else {
            DeviceTypes.findOne({devicetype: req.body.devicetype}, (err, device) => {
                if(err) {res.send(err)}
                else {
                    console.log(device)
                    device.brands.push(listing._id);
                    device.save();
                    Brands.find({})
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
    Brands.findById(req.params.id, (err,data) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send(data);
        }
    })
});


router.delete('/:id', (req,res)=> {
    Brands.findByIdAndRemove(req.params.id, (err,data)=> {
        if (err){
            console.log(err);
        }
        else {
            res.send(data);
        }
    });
});

router.put('/:id', (req,res)=> {
    Brands.findByIdAndUpdate(req.params.id,{$set: req.body}, {new:true}, (err,data)=> {
        if (err){
            console.log(err);
        }
        else {
            res.send(data);
        }
    });
});




module.exports = router;
