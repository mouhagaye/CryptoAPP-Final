const mongoose = require('mongoose');
const  uniqueValidator = require('mongoose-unique-validator');

const ecommerceSchema = mongoose.Schema({
    code_achat : {type : String, unique : true, require : true},
    createdBy : {type : String, require : true},
})

ecommerceSchema.plugin(uniqueValidator);
module.exports = mongoose.model('Ecommerce', ecommerceSchema)