const SynapsePay = require('synapsepay');

const keys = require('../config/keys');
const synapseFiBase = require('./synapseFiBase');

const client = synapseFiBase.client;
const Users = synapseFiBase.Users;
const Helpers = synapseFiBase.Helpers;

const Nodes = SynapsePay.Nodes;

const synapseNodePayload = {
  type: 'SYNAPSE-US',
  info: {
    nickname: 'My Synapse Wallet'
  },
  extra: {
    supp_id: '123sa'
  }
};

let user;

let USER_ID = '59f01b6e14c7fa0032a3b264'; // USER A
// let USER_ID = '59f01b7914c7fa0034a3b39d'; // USER B
let USER_FINGERPRINT = keys.FINGERPRINT;

// Get User
let options = {
  _id: USER_ID,
  fingerprint: USER_FINGERPRINT,
  ip_address: Helpers.getUserIP(),
  full_dehydrate: 'yes' //optional
};

Users.get(
  client,
  options,
  function(errResp, userResponse) {
    // error or user object
    user = userResponse;
    console.log(user);
    Nodes.create(
      user,
      synapseNodePayload,
      function(err, nodeResponse) {
        // error or node object
        node = nodeResponse;
      }
    );
  }
);