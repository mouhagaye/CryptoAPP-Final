// import StellarSdk from "stellar-sdk";
import { log } from "helpers/log";
const StellarSdk = require('stellar-sdk')
export const getHomeDomainFromAssetIssuer = async (
  assetIssuer,
  networkUrl,
) => {
  log.request({
    title: "Getting home domain from asset issuer",
    body: `Asset issuer ${assetIssuer}`,
  });

  const server = new StellarSdk.Server(networkUrl);
  const accountRecord = await server.loadAccount(assetIssuer);
  const homeDomain = accountRecord.home_domain;

  if (!homeDomain) {
    throw new Error(
      `Asset issuer ${assetIssuer} does not have home domain configured`,
    );
  }

  log.response({
    title: "Received home domain from asset issuer",
    body: `Asset issuer ${assetIssuer}, home domain ${homeDomain}.`,
  });

  return homeDomain;
};
