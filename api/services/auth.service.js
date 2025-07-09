const UserService = require('./../services/usuarios.services');
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { config } = require('./../config/config');
const nodemailer = require('nodemailer');

const service = new UserService();

class AuthService {
  async getUser(email, password) {
    const user = await service.findByEmail(email);
    if (!user) {
      throw boom.unauthorized();
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw boom.unauthorized();
    }
    delete user.dataValues.password;
    return user;
  }

  async generateToken(user) {
    const payload = {
      sub: user.id,
      role: user.role,
    };
    const accesToken = jwt.sign(payload, config.jwtSecret, {
      expiresIn: '15m',
    });

    const refreshToken = jwt.sign(payload, config.jwtRefreshToken, {
      expiresIn: '1d',
    });
    return { accesToken, refreshToken };
  }

  async sendMail(email) {
    const user = await service.findByEmail(email);
    if (!user) {
      throw boom.unauthorized();
    }
    let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      secure: true,
      port: 465,
      auth: {
        user: config.emailUser,
        pass: config.emailPassword,
      },
    });
    await transporter.sendMail({
      from: config.emailUser,
      to: `${user.email}`,
      subject: 'Nuevo correo',
      text: 'Este es un nuevo mensaje de pruba de nodeMailer?',
      html: '<b>Prueba numero 3000 de nodeMailer</b>',
    });
    return { message: 'Mail sent' };
  }
}

module.exports = AuthService;
