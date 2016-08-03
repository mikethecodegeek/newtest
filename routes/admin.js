/**
 * Created by Admin on 6/15/16.
 */
var express = require('express');
var router = express.Router();
var User = require('../models/user');
var request = require('request');
var jwt = require('jsonwebtoken');
var path = require('path');


router.get('/', (req,res)=> {

    //res.sendFile(path.resolve('dashboard/dashboard.html'));
    res.redirect(path.resolve('dashboard/dashboard.html'));
});

module.exports = router;