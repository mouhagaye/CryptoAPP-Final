
const axios = require('axios').default
exports.pollTransactionUntilComplete = async (
  sendServer,
  transactionId,
  token,
) => {

  const TransactionStatus = {
    COMPLETED = "completed",
    ERROR = "error",
    INCOMPLETE = "incomplete",
    PENDING_ANCHOR = "pending_anchor",
    PENDING_CUSTOMER_INFO_UPDATE = "pending_customer_info_update",
    PENDING_EXTERNAL = "pending_external",
    PENDING_RECEIVER = "pending_receiver",
    PENDING_SENDER = "pending_sender",
    PENDING_STELLAR = "pending_stellar",
    PENDING_TRANSACTION_INFO_UPDATE = "pending_transaction_info_update",
    PENDING_TRUST = "pending_trust",
    PENDING_USER = "pending_user",
    PENDING_USER_TRANSFER_START = "pending_user_transfer_start",
  }
  let currentStatus;
  let resultJson;

 
  while (
    ![
      TransactionStatus.
      TransactionStatus.PENDING_EXTERNAL,
      TransactionStatus.COMPLETED,
      TransactionStatus.ERROR,
    ].includes(currentStatus)
  ) {
    // eslint-disable-next-line no-await-in-loop
    const result = await axios.get(`${sendServer}/transactions/${transactionId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (result.status !== 200) {
      throw new Error(
        `GET \`/transactions/${transactionId}\` responded with status \`${result.status}\``,
      );
    }

    // eslint-disable-next-line no-await-in-loop
    resultJson = await result.json();

    if (currentStatus !== resultJson.transaction.status) {
      currentStatus = resultJson.transaction.status;

   

      switch (currentStatus) {
        case TransactionStatus.PENDING_SENDER:
          console.log("Awaiting payment to be initiated by sending anchor");
          break;
        case TransactionStatus.PENDING_STELLAR:
          console.log("Transaction has been submitted to Stellar network, but is not yet confirmed");
          break;
        case TransactionStatus.PENDING_CUSTOMER_INFO_UPDATE:
          console.log("Certain pieces of information need to be updated by the sending anchor");
          break;
        case TransactionStatus.PENDING_TRANSACTION_INFO_UPDATE:
          console.log("Certain pieces of information need to be updated by the sending anchor");
          break;
        case TransactionStatus.PENDING_RECEIVER:
          console.log("Payment is being processed by the receiving anchor");
          break;
        default:
        // do nothing
      }
    }

    // run loop every 2 seconds
    // eslint-disable-next-line no-await-in-loop
    await new Promise((resolve) => setTimeout(resolve, 2000));
  }

  if (!resultJson) {
    throw new Error("Something went wrong, there was no response");
  }
console.log(`GET \`/transactions/${transactionId}\``, resultJson);
};
