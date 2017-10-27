const express = require('express');

const router = express.Router();

const SynapsePay = require('synapsepay');

const Transactions = SynapsePay.Transactions;

const synapseFiBase = require('../synapseFiBase');
const keys = require('../../config/keys');

const Helpers = synapseFiBase.Helpers;
const client = synapseFiBase.client;
const Users = synapseFiBase.Users;

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


// router.post("/createTransaction", (req, res) => {
//   // const Transactions = SynapsePay.Transactions;
//   console.log('TYPE:', req.body.node.json.type);
//   const createPay = {
//     to: {
//       type: "SYNAPSE-US",
//       id: req.body.node.json._id
//     },
//     amount: {
//       amount: 100,
//       currency: "USD"
//     },
//     extra: {
//       ip: Helpers.getUserIP()
//     }
//   };
//   Transactions.create(req.body.node, createPay, (err, transactionResp) => {
//     // error or transaction object
//     // transaction = transactionResp;
//     if (!err) {
//       res.sendStatus(200);
//     } else {
//       res.sendStatus(400);
//     }
//   });
// });

// getAllTransaction
router.post('/getAllTransactions', (req, res) => {
  const node = req.body;
  Transactions.get(node, null, (err, transactionsResp) => {
    // error or transaction object
    res.send(transactionsResp);
  });
});

module.exports = router;
