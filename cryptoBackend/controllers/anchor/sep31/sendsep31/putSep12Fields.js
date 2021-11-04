import { Keypair } from "stellar-sdk";
import { log } from "helpers/log";
const Stellar = require('stellar-sdk')
const axios = require('axios').default

export const putSep12Fields = async (
  formData,
  secretKey,
  senderMemo,
  receiverMemo,
  fields,
  token,
  kycServer,
) => {
  console.log("Making PUT `/customer` requests for sending and receiving users");
  
  const result = {
    senderSep12Id: "",
    receiverSep12Id: "",
  };

  if (fields.sender) {
    const resultJson = await putSep12FieldsRequest({
      secretKey,
      fields: formData.sender,
      memo: senderMemo,
      token,
      kycServer,
      isSender: true,
    });

    result.senderSep12Id = resultJson.id;
  }

  if (fields.receiver) {
    const resultJson = await putSep12FieldsRequest({
      secretKey,
      fields: formData.receiver,
      memo: receiverMemo,
      token,
      kycServer,
      isSender: false,
    });

    result.receiverSep12Id = resultJson.id;
  }

  return result;
};

const putSep12FieldsRequest = async (
  secretKey,
  fields,
  memo,
  token,
  kycServer,
  isSender,
) => {  
  const publicKey = new Stellar.Keypair.fromSecret(secretKey).publicKey();
  const data = {
    account: publicKey,
    memo_type: "hash",
    memo,
    ...fields,
  };

  console.log("PUT `/customer`", data);

  const body = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    body.append(key, value.toString());
  });

  const result = await axios.put(`${kycServer}/customer`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body,
  });

  const resultJson = await result.json();
  console.log(`PUT \`/customer\` (${isSender ? "sender" : "receiver"})`);

  if (result.status !== 202) {
    throw new Error(
      `Unexpected status for PUT \`/customer\` request: ${result.status}`,
    );
  }

  return resultJson;
};
