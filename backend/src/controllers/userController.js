// src/controllers/userController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const userController = {};

userController.signup = (req, res) => {
  const { email, password } = req.body;
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      return res.status(500).json({ error: err });
    } else {
      const userData = { email: email, password: hash };
      User.createUser(userData, (error, results) => {
        if (error) {
          return res.status(500).json({ error: error });
        }
        res.status(201).json({ message: 'User created successfully' });
      });
    }
  });
};

userController.login = (req, res) => {
  const { email, password } = req.body;
  User.getUserByUsername(email, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    if (results.length < 1) {
      return res.status(401).json({ message: 'Authentication failed' });
    }
    bcrypt.compare(password, results[0].password, (error, result) => {
      if (error) {
        return res.status(401).json({ message: 'Authentication failed' });
      }
      if (result) {
        const token = jwt.sign(
          {
            email: results[0].email,
            userId: results[0].id,
          },
          process.env.JWT_KEY,
          {
            expiresIn: '1h',
          }
        );
        return res.status(200).json({
          message: 'Authentication successful',
          token: token,
        });
      }
      res.status(401).json({ message: 'Authentication failed' });
    });
  });
};

module.exports = userController;
