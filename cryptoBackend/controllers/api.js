const Account = require('../models/account')

exports.loadAccount = (req, res)=>{
    const number_phone = req.params.number_phone;
    Account.findOne({number_phone : number_phone})
    .then((account)=>{
        if (!account) {
            return res.status(404).json({message : "Ce numéro n'a pas de compte", isOk : false})
        }

        return res.status(200).json({message : account, isOk : true})
    })
    .catch(error=>{
        return res.status(500).json({message : "Erreur serveur", isOk : false})
    })
}