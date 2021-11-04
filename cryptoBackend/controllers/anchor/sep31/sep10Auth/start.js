import { Utils } from "stellar-sdk";

export const start = async (
  authEndpoint,
  serverSigningKey,
  publicKey,
  homeDomain,
) => {
  const params = { account: publicKey, homeDomain };

  console.log("Starting the SEP-10 flow to authenticate the sending anchor’s Stellar account");

  console.log("GET `/auth`", params);

  const authURL = new URL(authEndpoint);
  Object.entries(params).forEach(([key, value]) => {
    authURL.searchParams.append(key, value);
  });

  const result = await fetch(authURL.toString());
  const resultJson = await result.json();
  console.log("GET `/auth`", resultJson);

  if (!resultJson.transaction) {
    throw new Error("The response didn’t contain a transaction");
  }

  const { tx } = Utils.readChallengeTx(
    resultJson.transaction,
    serverSigningKey,
    resultJson.network_passphrase,
    homeDomain,
    authURL.host,
  );

  return tx;
};
