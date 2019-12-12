const express = require('express')
const User = require('../models/User')

exports.getUser =  (req, res, next) => {
  console.log(req.params);
  User.findById(req.params.id)
  .then(user => {
    if (user) {
      res.status(200).json({
        message: 'Fetching USER succeeded',
        user: user
      });
    } else {
      res.status(404).json({ message: 'User not found!' });
    }
  })
  .catch(error => {
    res.status(500).json({
      message: 'Fetching user failed!'
    });
  });
}
