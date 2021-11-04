const express = require('express')
const router = express.Router();
const transactiontCtrl = require('../controllers/transactions')

router.post('/transfert', transactiontCtrl.Payment)
router.get('/historique/:number_phone', transactiontCtrl.historique)

module.exports = router