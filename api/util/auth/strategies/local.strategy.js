const { Strategy } = require('passport-local');
const bcrypt = require('bcrypt');
const boom = require('@hapi/boom');
const UserServices = require('../../../services/usuarios.services');
const service = new UserServices();

const localStrategy = new Strategy(
  {
    usernameField: 'email',
    passwordField: 'password',
  },
  async (email, password, done) => {
    try {
      const user = await service.findByEmail(email);
      if (!user) {
        done(boom.unauthorized('Usuario no encontrado'), false);
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        done(
          boom.unauthorized('Contraseña invalida, intente nuevamente'),
          false,
        );
      }
      delete user.dataValues.password;
      done(null, user);
      done(null, user);
    } catch (error) {
      done(error, false);
    }
  },
);
module.exports = localStrategy;
