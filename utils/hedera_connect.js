const { Client, PrivateKey, AccountCreateTransaction, Hbar, AccountBalanceQuery, TransferTransaction } = require('hashgraph/sdk');
require('dotenv').config();

const connect =  async () => {
    const accountId = process.env.MY_ACCOUNT_ID;
    const privateKey = process.env.MY_PRIVATE_KEY;

    if (accountId == null || privateKey == null) {
        throw new Error('environment variables MY_ACCOUNT_ID and MY_PRIVATE_KEY must be present');
    }

    const client = Client.forTestnet();
    client.setOperator(accountId, privateKey);

    // Create new keys for the account
    const newAccountPrivateKey = await PrivateKey.generateED25519();
    const newAccountPublicKey = newAccountPrivateKey.publicKey;

    // Create the account
    const transactionId = await new AccountCreateTransaction()
        .setKey(newAccountPublicKey)
        .setInitialBalance(Hbar.fromTinybars(1000))
        .execute(client);

    // Get the receipt of the transaction and get the new account ID
    const receipt = await transactionId.getReceipt(client); 
    const newAccountId = receipt.getAccountId();

    console.log('New account ID: ' + newAccountId);

    // Get the balance of the new account
    const accountBalance = await new AccountBalanceQuery()
        .setAccountId(newAccountId)
        .execute(client);

    console.log('The new account Balance is: ' + accountBalance.hbars.toTinybars() + ' tinybars');

    // Create transfer transaction
    const sendHbar = await new TransferTransaction()
        .addHbarTransfer(newAccountId, Hbar.fromTinybars(-1000))
        .addHbarTransfer(accountId, Hbar.fromTinybars(1000))
        .execute(client);

    // Get the receipt of the transaction and get the new account ID
    const sendHbarReceipt = await sendHbar.getReceipt(client);
    console.log('The transaction status is: ' + sendHbarReceipt.status.toString());

    // Request the cost of query
    const queryCost = await new AccountBalanceQuery()
        .setAccountId(newAccountId)
        .getCost(client);

    console.log('The cost of the query is: ' + queryCost);

    // Get the balance of the new account
    const accountBalance2 = await new AccountBalanceQuery()
        .setAccountId(newAccountId)
        .execute(client);

    console.log('The new account Balance is: ' + accountBalance2.hbars.toTinybars() + ' tinybars');
}

module.exports = { connect };