/**
 * Created by Admin on 6/13/16.
 */
var express = require('express');
var router = express.Router();
var Quotes = require('../models/quotes');
var request = require('request');


router.get('/', (req,res)=> {
    Quotes.find({})
        .exec((err, data) => {
            if (err) {
                console.log(err)
            }
            else {
                res.send(data);
            }

        });
});

router.post('/newquote', (req,res)=> {
   // console.log(req.body.transaction);
    var newQuote = {
        username: req.body.user.data.username,
        email: req.body.user.data.email,
        amount: req.body.transaction.quote,
        device: req.body.transaction.devicename,
        condition: req.body.transaction.condition,
        date: req.body.transaction.date,
        paymentmethod: req.body.transaction.paymentmethod
    }
  //  console.log('quote: ',newQuote)
    // username: {type: String},
    // amount: { type: Number, required: true },
    // device: { type: String, required: true },
    // status: { type: String, default: 'Pending'},
    // description: { type: String, default: 'N/A' },
    // condition: {type: String},
    // date: { type: String}

    Quotes.create(newQuote,(err, listing)=> {
        if (err){
            console.log(err);
            res.status(400).send(err)
        } else {
            res.status(200).send(listing);
        }
    });

});

router.get('/:id', (req,res)=> {
    Quotes.findById(req.params.id, (err,data) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send(data);
        }
    })
});


router.delete('/:id', (req,res)=> {
    Quotes.findByIdAndRemove(req.params.id, (err,data)=> {
        if (err){
            console.log(err);
        }
        else {
            Quotes.find({})
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
    Quotes.findByIdAndUpdate(req.params.id,{$set: req.body}, {new:true}, (err,data)=> {
        if (err){
            console.log(err);
        }
        else {
            res.send(data);
        }
    });
});




module.exports = router;

