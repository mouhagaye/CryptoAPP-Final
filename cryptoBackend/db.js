const mongoose = require('mongoose')

const cmongo = mongoose.connect('mongodb://localhost:27017/stellar' ,{useNewUrlParser: true, useUnifiedTopology: true}, (err)=>{
    if (!err) {
        console.log('base de données  : connexion reussi !');
    } else {
        console.log(err);
    }
})


// {useNewUrlParser: true, useUnifiedTopology: true}