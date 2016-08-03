var express = require('express');
var router = express.Router();
var User = require('../models/user');
var request = require('request');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

router.get('/', (req,res)=> {
     User.find({})
        .exec((err, data) => {
            if (err) {
                console.log(err)
            }
            else {
                res.send(data);
            }

        });
});

router.post('/register', (req,res) => {
   // console.log(req.body);
    User.register(req.body, (err, thisuser)=> {
        res.status(err ? 400 : 200).send(err || thisuser);
    })
});

router.post('/registeradmin',User.auth('admin'), (req,res) => {
    // console.log(req.body);
    User.registerAdmin(req.body, (err, thisuser)=> {
        res.status(err ? 400 : 200).send(err || thisuser);
    })
});

router.get('/profile', User.auth(), (req,res) => {
        res.send(req.user);

});

router.get('/admin', User.auth('admin'), (req,res) => {
    res.send(req.user);

});

router.post('/admin/password', User.auth('admin'), (req,res)=> {
  //  console.log(req.body.user._id)
    bcrypt.hash(req.body.password, 12, (err, hash) => {
        if(err) {
            console.log(err)
        } else  {
            User.findById(req.body.user._id, (err, dbUser) => {
                if(err) {
                    console.log(err);
                    res.send(err)
                }else {
                  //  console.log(dbUser);
                    dbUser.password = hash;
                  //  console.log(dbUser.password);
                    dbUser.save();
                    res.status(200).send();
                }
                
            });
        }
    });



});


router.post('/admin/changeemail', (req,res)=> {
   // console.log(req.body.email)
    User.findByIdAndUpdate(req.body.user._id,{$set: {email: req.body.email}}, {new:true}, (err,data)=> {
        if (err){
            console.log(err);
        }
        else {
            res.send(data);
        }
    });
});


router.post('/login', (req,res) => {
    User.authenticate(req.body, (err, token) => {
        if (err){
            res.status(400).send(err);
        }
        else {
            res.cookie('accessToken', token).send(token);
        }
    })
});

router.delete('/logout', (req, res) => {
    res.clearCookie('accessToken').send();
});

router.get('/verify/:token', (req, res) => {
    var token = req.params.token;

    User.verify(token, err => {
        if (err) {
            res.redirect('/#/verifyfail');
        } else {
            res.redirect('/#/verifysuccess');
        }
    });
});


router.post('/transactions/new', (req,res) => {
    userId=req.body.user.data._id;
    //console.log(req.body.transaction)
    User.findById(userId, (err,user) => {
       // console.log('This user transactions: ',user.transactions);
        if (err) {
            console.log(err);
        }
        else {
            user.transactions.push(req.body.transaction);
            user.save();
            res.send(user);
        }
    })
});


router.get('/:id', (req,res)=> {
    User.findById(req.params.id, (err,data) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send(data);
        }
    })
});


router.delete('/:id', (req,res)=> {
    User.findByIdAndRemove(req.params.id, (err,data)=> {
        if (err){
            console.log(err);
        }
        else {
           // res.send(data);
            User.find({})
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
    User.findByIdAndUpdate(req.params.id,{$set: req.body}, {new:true}, (err,data)=> {
        if (err){
            console.log(err);
        }
        else {
            res.send(data);
        }
    });
});




module.exports = router;

