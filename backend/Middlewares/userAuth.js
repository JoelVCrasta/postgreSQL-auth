const express = require('express');
const db = require('../Models');

const User = db.users;

const userAuth = async (req, res, next) => {
  try {
    const username = await User.findOne({
      where: {
        username: req.body.username,
      },
    });

    if (username) {
      res.status(409).send('Username already exists');
    }

    const emailCheck = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (emailCheck) {
      res.status(409).send('Email already exists');
    }

    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = { userAuth };
