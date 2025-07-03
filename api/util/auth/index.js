const passport = require('passport');

const localStrategy = require('./strategies/local.strategy');
const jwtStrategy = require('./../auth/strategies/jwt.strategy');

passport.use(localStrategy);
passport.use(jwtStrategy);

module.exports = passport;
