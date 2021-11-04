const Stellar = require('./Stellar').Stellar;
const server = require('./Stellar').Server
const eFCFA = require('./Stellar').eFCFA
const passphrase = require('./Stellar').Passphrase
const issuingKeys = require('./Stellar').issuingKeysEFCFA

exports.trust = (sk)=>{

  var receivingKeys = Stellar.Keypair.fromSecret(sk);
  server
  .loadAccount(receivingKeys.publicKey())
  .then(function (receiver) {
    var transaction = new Stellar.TransactionBuilder(receiver, {
      fee: Stellar.BASE_FEE,
      networkPassphrase: passphrase,
    })
      // The `changeTrust` operation creates (or alters) a trustline
      // The `limit` parameter below is optional
      .addOperation(
        Stellar.Operation.changeTrust({
          asset: eFCFA,
          limit: "1000000",
        }),
      )
      // setTimeout is required for a transaction
      .setTimeout(100)
      .build();
    transaction.sign(receivingKeys);
    return server.submitTransaction(transaction);
  })
  .then(console.log)

  // // Second, the issuing account actually sends a payment using the asset
  // .then(function () {
  //   return server.loadAccount(issuingKeys.publicKey());
  // })
  // .then(function (issuer) {
  //   var transaction = new Stellar.TransactionBuilder(issuer, {
  //     fee: 100,
  //     networkPassphrase: 'Standalone Network ; February 2017',
  //   })
  //     .addOperation(
  //       Stellar.Operation.payment({
  //         destination: receivingKeys.publicKey(),
  //         asset: eFCFA,
  //         amount: "1000",
  //       }),
  //     )
  //     // setTimeout is required for a transaction
  //     .setTimeout(100)
  //     .build();
  //   transaction.sign(issuingKeys);
  //   return server.submitTransaction(transaction);
  // })
  .then(console.log)
  .catch(function (error) {
  console.error("Error!", error);
  });
}
