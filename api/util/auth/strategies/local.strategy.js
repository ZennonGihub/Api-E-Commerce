const { Strategy } = require('passport-local');
const bcrypt = require('bcrypt');
const boom = require('@hapi/boom');
const AuthService = require('../../../services/auth.services');
const service = new AuthService();

const localStrategy = new Strategy(
  {
    usernameField: 'email',
    passwordField: 'password',
  },
  async (email, password, done) => {
    try {
      const user = await service.getUser(password, email);
      done(null, user);
    } catch (error) {
      done(error, false);
    }
  }
);
module.exports = localStrategy;
