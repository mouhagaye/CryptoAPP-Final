const express = require('express')
const bodyParser = require('body-parser')
const rp = require('request-promise')
const account = require('./routes/account');
const transaction = require('./routes/transaction')
const ecommerce = require('./routes/ecommerce')
const apiAccount = require('./routes/api')
const app = express()
const db = require('./db')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


/* CORS */
app.use((req, res, next) => {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*')
  
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
  
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'Authorization, Origin, X-Requested-With, Content, Accept, Content-Type')
    
  
    // Pass to next layer of middleware
    next()
})

/* API Routes */
app.use('/account', account);
app.use('/transaction', transaction);
app.use('/api', ecommerce);
app.use('/apiAccount', apiAccount)

module.exports = app;