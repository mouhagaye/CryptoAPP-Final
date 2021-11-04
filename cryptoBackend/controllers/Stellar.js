const Stellar = require('stellar-sdk');
const Server = new Stellar.Server('http://127.0.0.1:8000/', {allowHttp: true});
const Passphrase = 'Standalone Network ; February 2017';
// const eFCFA = new Stellar.Asset('eFCFA', 'GCCLONGKVXV3TFQ6KXSDALKFOTBZFMKTGRPHITMRVTQSNF2ZKFLDHCBK');


const asset_code = 'eFCFA';
// const Server = new Stellar.Server('https://horizon-testnet.stellar.org/');
// const Passphrase = 'Test SDF Network ; September 2015';
// const urlAnchor = 'testanchor.stellar.org';
// const eFCFA = new Stellar.Asset('SRT', 'GCDNJUBQSX7AJWLJACMJ7I4BC3Z47BQUTMHEICZLE6MU4KQBRYG5JY6B');

const eFCFA = new Stellar.Asset('eFCFA', 'GA2G4RFZH6PJQ2MNY5UBPPW7KERGVQE3ATZ5DBMY5IBR4LJZH346BGAT');
const issuingKeysEFCFA = Stellar.Keypair.fromSecret("SB757ZRPZS3KHMYR5AGZ7ELIXK6DAU3FRRXIXPNMLUCIR6XNF5EIQ5NT");

exports.Stellar = Stellar;
exports.Server = Server;
exports.Passphrase = Passphrase;
exports.eFCFA = eFCFA; 
exports.issuingKeysEFCFA = issuingKeysEFCFA;
exports.asset_code = asset_code;