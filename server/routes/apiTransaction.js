const express = require('express');

const router = express.Router();

const SynapsePay = require('synapsepay');

const Transactions = SynapsePay.Transactions;

const synapseFiBase = require('../synapseFiBase');

const Helpers = synapseFiBase.Helpers;

// Create a Transaction
router.post('/createTransaction', (req, res) => {
  const createPayload = {
    to: {
      type: req.body.toNode.json.type,
      id: req.body.toNode.json._id,
    },
    amount: {
      amount: req.body.amount,
      currency: 'USD',
    },
    extra: {
      ip: Helpers.getUserIP(),
    },
  };

  Transactions.create(req.body.fromNode, createPayload, (err, transactionResp) => {
    // error or transaction object
    // transaction = transactionResp;
    if (err) {
      console.log('err', err);
      res.send(err);
    } else {
      res.send(transactionResp);
    }
  });
});


// getAllTransaction
router.post('/getAllTransactions', (req, res) => {
  const node = req.body;
  Transactions.get(node, null, (err, transactionsResp) => {
    // error or transaction object
    res.send(transactionsResp);
  });
});

module.exports = router;
