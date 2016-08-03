/**
 * Created by Admin on 6/13/16.
 */
var express = require('express');
var router = express.Router();
var Messages = require('../models/messages');
var request = require('request');


router.get('/', (req,res)=> {
    Messages.find({})
        .exec((err, data) => {
            if (err) {
                console.log(err)
            }
            else {
                res.send(data);
            }

        });
});

router.post('/newmessage', (req,res)=> {
    //console.log('Message: ', req.body.message.user)
    Messages.create({message: req.body.message.message, user: req.body.message.user},(err, listing)=> {
        if (err){
            console.log(err);
            res.status(400).send(err)
        } else {
            res.status(200).send(listing);
        }
    });

});

router.get('/:id', (req,res)=> {
    Messages.findById(req.params.id, (err,data) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send(data);
        }
    })
});


router.delete('/:id', (req,res)=> {
    Messages.findByIdAndRemove(req.params.id, (err,data)=> {
        if (err){
            console.log(err);
        }
        else {
            Messages.find({})
                .exec((err, data) => {
                    if (err) {
                        console.log(err)
                    }
                    else {
                        res.send(data);
                    }

                });
        }
    });
});

router.put('/:id', (req,res)=> {
    Messages.findByIdAndUpdate(req.params.id,{$set: req.body}, {new:true}, (err,data)=> {
        if (err){
            console.log(err);
        }
        else {
            res.send(data);
        }
    });
});




module.exports = router;
