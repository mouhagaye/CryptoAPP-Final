const express = require('express');
const router = express.Router();
const ecommmerceCtrl = require('../controllers/ecommerce')

router.post('/payment', ecommmerceCtrl.payment)
router.get('/codeMarchand/:number_phone', ecommmerceCtrl.code_marchandss)
router.post('/paymentMarchand', ecommmerceCtrl.paymentMarchand)

module.exports = router;