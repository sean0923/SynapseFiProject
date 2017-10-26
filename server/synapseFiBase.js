const SynapsePay = require('synapsepay');

const keys = require('../config/keys');

const Clients = SynapsePay.Clients;
const Helpers = SynapsePay.Helpers;

const client = new Clients(
  // client id should be stored as an environment variable
  keys.CLIENT_ID,
  // client secret should be stored as an environment variable
  keys.CLIENT_SECRET,
  // is_production boolean determines sandbox or production endpoints used
  false
);

// Imports
const Users = SynapsePay.Users;

module.exports = {
  Helpers,
  client,
  Users,
  keys
};
