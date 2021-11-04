import { Keypair, Transaction } from "stellar-sdk";

export const sign = (
  challengeTransaction,
  networkPassphrase,
  secretKey,
) => {
  console.log("We’ve received a challenge transaction from the server that we need the sending anchor to sign with their Stellar private key");

  const envelope = challengeTransaction.toEnvelope().toXDR("base64");
  const transaction = new Transaction(envelope, networkPassphrase);
  transaction.sign(Keypair.fromSecret(secretKey));

  console.log("SEP-10 signed transaction", transaction);
  console.log("SEP-10 signed transaction, `base64` encoded", transaction.toEnvelope().toXDR("base64"));

  return transaction;
};
