const express = require('express');
const User = require('../db/models/User');

module.exports = (function () {
  'use strict';
  let api = express.Router();

  api.get('/all', function (req, res, next) {
    User.find().select('-__v').exec(function (err, users) {
      if (err) {
        next(err)
      } else {
        res.json(users)
      }
    })
  })

  api.get('/:id', function (req, res, next) {
    User.findById(req.params.id, '-__v', function (err, user) {
      if (err) {
        next(err)
      } else {
        res.json(user)
      }
    })
  })

  api.post('/register', async function (req, res, next) {
    let body = req.body;

    if (body.name === undefined) {
      res.status(400).json({ error: `Missing 'name' parameter in POST body` });
      return;
    }

    let existingUser = await User.find({ name: body.name });
    if (existingUser && existingUser.length > 0) {
      return res.send(existingUser[0]);
    }

    var user = new User({
      name: body.name,
      fame: 0,
    });


    user.save(function (err) {
      if (err) {
        res.status(500).json({ error: `Error saving user to database` });
        console.error(err);
        return;
      }
      res.send(user);
    })
  })

  return api;
})();
