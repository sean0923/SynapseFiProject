const synapseFiBase = require('./synapseFiBase');
const keys = require('../config/keys');

const Helpers = synapseFiBase.Helpers;
const client = synapseFiBase.client;
const Users = synapseFiBase.Users;


// Create a User
const createPayload = {
  logins: [
    {
      email: 'javascriptTest@synapsepay.com',
      password: 'test1234',
      read_only: false
    }
  ],
  phone_numbers: [
    '901.111.1111'
  ],
  legal_names: [
    'personB'
  ],
  extra: {
    note: 'Interesting user',
    supp_id: '122eddfgbeafrfvbbb',
    is_business: false
  }
};

let user;

Users.create(
  client,
  // fingerprint (specific to user or static for application)
  keys.FINGERPRINT,
  Helpers.getUserIP(),
  createPayload,
  function(err, userResponse) {
    // error or user object
    console.log(userResponse);
    user = userResponse;
  }
);

// console.log(client);


