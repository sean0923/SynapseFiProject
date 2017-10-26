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
  const node = req.body.node;
  console.log('is it ? ', node.json._id);
  const createPayload = {
    to: {
      type: node.json.type,
      id: node.json._id,
    },
    amount: {
      amount: 1.1,
      currency: 'USD',
    },
    extra: {
      ip: Helpers.getUserIP(),
    },
  };

  Transactions.create(node, createPayload, (err, transactionResp) => {
    // error or transaction object
    // transaction = transactionResp;
    if (err) {
      console.log('err', err);
      console.log('err????');
      res.send(err);
    } else {
      // console.log(transactionResp);
      console.log('err or not????');
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
