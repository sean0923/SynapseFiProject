const SynapsePay = require('synapsepay');
const synapseFiBase = require('./synapseFiBase');

const keys = require('../config/keys');


const Helpers = synapseFiBase.Helpers;
const client = synapseFiBase.client;
const Users = synapseFiBase.Users;
const Nodes = SynapsePay.Nodes;

// Get All Nodes

let nodes;

// let user = 

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

console.log('ipADRESS: ', options.ip_address);

Users.get(
  client,
  options,
  function(errResp, userResponse) {
    // error or user object
    user = userResponse;
    console.log('this is user', user);
    Nodes.get(
      user,
      null,
      function(err, nodesResponse) {
        // error or array of node objects
        // nodes = nodesResponse;
        console.log(nodesResponse);
      }
    );
  }
);


// Users.get(
//   client,
//   options,
//   function(errResp, userResponse) {
//     // error or user object
//     user = userResponse;
//     console.log(user);
//   }
// ).then((user) => {
//   Nodes.get(
//     user,
//     null,
//     function(err, nodesResponse) {
//       // error or array of node objects
//       // nodes = nodesResponse;
//       console.log(nodesResponse);
//     }
//   );
// });

