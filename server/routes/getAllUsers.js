const synapseFiBase = require('../synapseFiBase');

const Helpers = synapseFiBase.Helpers;
const client = synapseFiBase.client;
const Users = synapseFiBase.Users;

// Get All Users
let options = {
  ip_address: Helpers.getUserIP(),
  page: '', //optional
  per_page: '', //optional
  query: '' //optional
};

let getAllUsers = Users.get(
  client,
  options,
  function (err, usersResponse) {
    // console.log(users.users);
    usersResponse.users.forEach((user) => {
      console.log(user.legal_names, user._id, user.refresh_token);
    });
  }
);
