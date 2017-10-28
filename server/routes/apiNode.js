const express = require('express');
const router = express.Router();

const SynapsePay = require('synapsepay');
const Nodes = SynapsePay.Nodes;


router.post('/createNode', (req, res) => {
  const synapseNodePayload = {
    type: 'SYNAPSE-US',
    info: {
      nickname: req.body.nickname,
    },
    extra: {
      supp_id: '123sa',
    },
  };
  const user = req.body.user;
  Nodes.create(user, synapseNodePayload, (err, nodeResponse) => {
    res.send(nodeResponse);
  });
});

router.post('/create_ACH_US_Node', (req, res) => {
  const achPayload = {
    type: 'ACH-US',
    info: {
      nickname: 'Node Library Checking Account',
      name_on_account: 'Node Library',
      account_num: '72347235423',
      routing_num: '051000017',
      type: 'PERSONAL',
      class: 'CHECKING',
    },
    extra: {
      supp_id: '123sa',
    },
  };
  const user = req.body;
  Nodes.create(user, achPayload, (err, nodeResponse) => {
    res.send(nodeResponse);
  });
});

// get all nodes
router.post('/getAllNodes', (req, res) => {
  const user = req.body;
  Nodes.get(user, null, (err, nodesResponse) => {
    res.send(nodesResponse);
  });
});

// get all nodes
router.post('/getOneNode', (req, res) => {
  const user = req.body.selectedUser;
  const node_id = req.body.selectedNode_id;
  Nodes.get(
    user,
    {
      _id: node_id,
      full_dehydrate: 'yes', // optional
    },
    (err, nodeResponse) => {
      // error or node object
      res.send(nodeResponse);
    }
  );
});

module.exports = router;
