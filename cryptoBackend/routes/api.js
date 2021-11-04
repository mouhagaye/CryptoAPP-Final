const express = require('express');
const router = express.Router();
const apiCtrl = require('../controllers/api');

router.get('/loadAccount/:number_phone', apiCtrl.loadAccount);

module.exports = router;