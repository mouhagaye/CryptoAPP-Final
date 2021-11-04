const axios = require('axios').default

export const send = async (
  authEndpoint,
  signedChallengeTransaction,
) => {
  const params = {
    transaction: signedChallengeTransaction.toEnvelope().toXDR("base64"),
  };
  console.log("We need to send the signed SEP-10 challenge back to the server to get a JWT token to authenticate our Stellar account with future actions");
  
  console.log("POST `/auth`", params);

  const urlParams = new URLSearchParams(params);
  const result = await axios.post(authEndpoint, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: urlParams.toString(),
  });

  const resultJson = await result.json();
  console.log( "POST `/auth`", resultJson);

  if (!resultJson.token) {
    throw new Error("No token returned from `/auth`");
  }

  return resultJson.token;
};
