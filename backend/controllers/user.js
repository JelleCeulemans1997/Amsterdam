
const express = require("express");
const User = require("../models/user");
const auth = require("../middleware/auth");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");

// const sgMail = require('@sendgrid/mail')
// sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const router = express.Router();


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

exports.createUser = (req, res, next) => {
  bcryptjs.hash(req.body.password, 10).then(hash => {
    const user = new User({
      email: req.body.email,
      password: hash,
      role: req.body.role
    });
    user.save()
      .then(result => {
        console.log(result);
        res.status(201).json({ message: "User created!", result });
      })
      .catch(err => {
        res.status(500).json({
          message: "Invalid authentication credentials!"
        });
      });
  });
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findByCredentials(email, password);
    if (!user) {
      return res
        .status(401)
        .send({ error: "Login failed! Check authentication credentials" });
    }
    const token = await user.generateAuthToken();
    res.send({ role: user.role, token, id: user._id });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getByUserId = async (req, res) => {
  User.findById(req.params.id)
    .then(user => {
      user
        ? res.status(200).json(user)
        : res.status(404).json({ message: "User not found!" });
    })
    .catch(error => {
      res.status(500).json({ message: "Fetching user failed" });
    });
};

exports.deleteUser = (req, res, next) => {
  User.deleteOne({ _id: req.params.id })
    .then(result => {
      res.status(200).json({ message: 'Deletion successful!' });
    })
    .catch(error => {
      res.status(500).json({
        message: 'Deleting company failed!'
      });
    });
};
