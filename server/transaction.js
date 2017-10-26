
const SynapsePay = require('synapsepay');
const Transactions = SynapsePay.Transactions;

const keys = require('../config/keys');


const Clients = SynapsePay.Clients;
const Helpers = SynapsePay.Helpers;

// Create a Transaction

const createPayload = {
  to: {
    type: 'SYNAPSE-US',
    id: TO_NODE_ID
  },
  amount: {
    amount: 1.10,
    currency: 'USD'
  },
  extra: {
    supp_id: '1283764wqwsdd34wd13212',
    note: 'Deposit to bank account',
    webhook: 'http://requestb.in/q94kxtq9',
    process_on: 1,
    ip: Helpers.getUserIP()
  },
  fees: [{
    fee: 1.00,
    note: 'Facilitator Fee',
    to: {
      id: FEE_TO_NODE_ID
    }
  }]
};

let transaction;

Transactions.create(
  node,
  createPayload,
  function(err, transactionResp) {
    // error or transaction object
    transaction = transactionResp;
  }
);
