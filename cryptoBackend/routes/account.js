const express = require('express');
const router = express.Router();
const accountCtrl = require('../controllers/account');
const deposite = require('../controllers/anchor/deposite')
const withdraw = require('../controllers/anchor/withdraw')
const sep31 = require('../controllers/anchor/sep31/sendsep31/checkInfo')

router.post('/createAccount', accountCtrl.creatingAccount);
router.get('/balance/:number_phone', accountCtrl.balance);
router.post('/getCodeAchat', accountCtrl.getCodeAchat);
router.post('/login', accountCtrl.login)
router.get('/getFacture/:numero_facture', accountCtrl.getFature)
router.post('/deposite', deposite.deposite)
router.post('/withdrawal', withdraw.withdraw)

module.exports = router;