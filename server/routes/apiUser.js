const express = require('express');

const synapseFiBase = require('../synapseFiBase');
const keys = require('../../config/keys');

const router = express.Router();
const Helpers = synapseFiBase.Helpers;
const client = synapseFiBase.client;
const Users = synapseFiBase.Users;

// Create a User
router.post('/createUser', (req, res) => {
  const createPayload = {
    logins: [
      {
        email: req.body.email,
        password: req.body.password,
        read_only: false,
      },
    ],
    phone_numbers: [req.body.phone_numbers],
    legal_names: [req.body.legal_names],
    extra: {
      note: 'Personal User',
    },
  };

  Users.create(
    client,
    keys.FINGERPRINT,
    Helpers.getUserIP(),
    createPayload,
    (err, userResponse) => {
      // error or user object
      // user = userResponse;
      res.send(userResponse);
    }
  );
});

router.post('/getUser', (req, res) => {
  // console.log('this is req.body', req.body);
  const options = {
    _id: req.body.selectedUserId,
    fingerprint: keys.FINGERPRINT,
    ip_address: Helpers.getUserIP(),
    full_dehydrate: 'yes', // optional
  };

  Users.get(client, options, (errResp, userResponse) => {
    // error or user object
    const user = userResponse;
    // console.log(user);
    res.send(user);
  });
});

router.get('/getAllUsers', (req, res) => {
  console.log('GET');

  // Get All Users
  const options = {
    ip_address: Helpers.getUserIP(),
    page: '', // optional
    per_page: '', // optional
    query: '', // optional
  };

  Users.get(client, options, (err, usersResponse) => {
    // console.log(users.users);
    // usersResponse.users.forEach((user) => {
    //   console.log(user.legal_names, user._id, user.refresh_token);
    // });
    // res.send('yeah');
    res.send(usersResponse.users);
  });
});

module.exports = router;
