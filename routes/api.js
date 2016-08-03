var express = require('express');
var router = express.Router();

router.use('/users', require('./user'));
router.use('/brands', require('./brands'));
router.use('/models', require('./models'));
router.use('/listings', require('./listing'));
router.use('/quotes', require('./quotes'));
router.use('/inbox', require('./messages'));
router.use('/devicetypes', require('./devicetypes'));
router.use('/devices', require('./devices'));

module.exports = router;
