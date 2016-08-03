var express = require('express');
var router = express.Router();
var DeviceTypes = require('../models/deviceTypes');
var request = require('request');

router.get('/', (req,res)=> {
   // var populateQuery = [{path: 'DeviceTypes', select:'brands'}]  //, {path:'movie', select:'director'}];
    DeviceTypes.find()
        .deepPopulate('brands brands.models brands.models.versions')
        .exec((err, data) => {
            if (err) {
                console.log(err)
            }
            else {
                res.send(data);
            }

        });
});

router.post('/newdevice', (req,res)=> {
   // console.log(req.body.device);
    DeviceTypes.create(req.body.device,(err, listing)=> {
        if (err){
            console.log(err);
            res.status(400).send(err)
        } else {
            DeviceTypes.find({})
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

});

router.get('/:id', (req,res)=> {
    DeviceTypes.findById(req.params.id, (err,data) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send(data);
        }
    })
});


router.delete('/:id', (req,res)=> {
    DeviceTypes.findByIdAndRemove(req.params.id, (err,data)=> {
        if (err){
            console.log(err);
        }
        else {
            res.send(data);
        }
    });
});

router.put('/:id', (req,res)=> {
    DeviceTypes.findByIdAndUpdate(req.params.id,{$set: req.body}, {new:true}, (err,data)=> {
        if (err){
            console.log(err);
        }
        else {
            res.send(data);
        }
    });
});




module.exports = router;
