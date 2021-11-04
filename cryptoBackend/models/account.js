const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');


const accountSchema = mongoose.Schema({
    number_phone: { type: String, require: true, unique : true },
    public_key: { type: String, require: true, unique : true },
    secret_key: { type: String, require: true, unique : true },
    password: { type: String, require: true, unique : true },
    nom: { type: String, require: true, unique : true },
    prenom: { type: String, require: true, unique : true },
    send : { type : Array},
    receive : { type : Array },
    code_marchand : { type : String, unique : true }
});

accountSchema.plugin(uniqueValidator);
module.exports = mongoose.model('Account', accountSchema);