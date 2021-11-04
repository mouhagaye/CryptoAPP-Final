
const axios = require('axios').default

export const postTransaction = async (
  token,
  sendServer,
  senderId,
  receiverId,
  transactionFormData,
  assetCode,
  amount,
) => {
  console.log("POST relevant field info to create a new payment");


  const body = {
    sender_id: senderId,
    receiver_id: receiverId,
    fields: { transaction: transactionFormData },
    asset_code: assetCode,
    amount,
  };
  console.log("POST `/transactions`",body);

  const result = await axios.post(`${sendServer}/transactions`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (![200, 201].includes(result.status)) {
    throw new Error(
      `POST \`/transactions\` responded with status ${result.status}`,
    );
  }

  const resultJson = await result.json();
  console.log("POST `/transactions`", resultJson);
  const requiredProps = [
    "id",
    "stellar_account_id",
    "stellar_memo_type",
    "stellar_memo",
  ];

  requiredProps.forEach((prop) => {
    if (!resultJson[prop]) {
      throw new Error(
        `POST \`/transactions\` response missing property \`${prop}\``,
      );
    }
  });

  return {
    sendMemoType: resultJson.stellar_memo_type,
    sendMemo: resultJson.stellar_memo,
    receiverAddress: resultJson.stellar_account_id,
    transactionId: resultJson.id,
  };
};
