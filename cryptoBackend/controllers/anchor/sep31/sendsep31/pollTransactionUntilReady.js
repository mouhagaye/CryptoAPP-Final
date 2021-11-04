

exports.pollTransactionUntilReady = async (
  sendServer,
  transactionId,
  token,
) => {
  console.log(`Polling \`/transactions/:id\` endpoint until transaction status is \`${TransactionStatus.PENDING_SENDER}\``);
 
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
  let transactionStatus;

  while (transactionStatus !== TransactionStatus.PENDING_SENDER) {
    console.log(`GET \`/transactions/${transactionId}\``);
    // eslint-disable-next-line no-await-in-loop
    const result = await fetch(`${sendServer}/transactions/${transactionId}`, {
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
    const resultJson = await result.json();
    console.log(`GET \`/transactions/${transactionId}\``, resultJson);
    
    transactionStatus = resultJson.transaction.status;

    // eslint-disable-next-line no-await-in-loop
    await new Promise((resolve) => setTimeout(resolve, 2000));
  }
}
