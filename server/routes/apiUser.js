const express = require('express');

const synapseFiBase = require('../synapseFiBase');
const keys = require('../../config/keys');

const router = express.Router();
const Helpers = synapseFiBase.Helpers;
const client = synapseFiBase.client;
const Users = synapseFiBase.Users;

// // Create a User
// router.get('/createUser', (req, res) => {
//   const createPayload = {
//     logins: [
//       {
//         email: 'javascriptTest@synapsepay.com',
//         password: 'test1234',
//         read_only: false
//       }
//     ],
//     phone_numbers: [
//       '901.111.1111'
//     ],
//     legal_names: [
//       'personB'
//     ],
//     extra: {
//       note: 'Interesting user',
//       supp_id: '122eddfgbeafrfvbbb',
//       is_business: false
//     }
//   };

//   Users.get(client, options, (err, usersResponse) => {
//     // console.log(users.users);
//     usersResponse.users.forEach((user) => {
//       console.log(user.legal_names, user._id, user.refresh_token);
//     });
//     // res.send('yeah');
//     res.send(usersResponse.users);
//   });
// });


router.post('/getUser', (req, res) => {
  const options = {
    _id: req.body._id,
    fingerprint: keys.FINGERPRINT,
    ip_address: Helpers.getUserIP(),
    full_dehydrate: 'yes', // optional
  };

  Users.get(client, options, (errResp, userResponse) => {
    // error or user object
    let user = userResponse;
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
