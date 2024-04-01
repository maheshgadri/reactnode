// src/models/userModel.js
const db = require('./db');

const User = {};

User.createUser = (userData, callback) => {
  db.query('INSERT INTO users SET ?', userData, callback);
};

User.getUserByUsername = (email, callback) => {
  db.query('SELECT * FROM users WHERE email = ?', [email], callback);
};

module.exports = User;
