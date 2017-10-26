const synapseFiBase = require('./synapseFiBase');
const keys = require('../config/keys');

const Helpers = synapseFiBase.Helpers;
const client = synapseFiBase.client;
const Users = synapseFiBase.Users;

let USER_ID = '59f01b7914c7fa0034a3b39d';
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
  }
);