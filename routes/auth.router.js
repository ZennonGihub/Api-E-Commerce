const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const { config } = require('./../config/config');
const boom = require('@hapi/boom');
const AuthService = require('./../services/auth.service');

const service = new AuthService();
const router = express();

router.post(
  '/login',
  passport.authenticate('local', { session: false }),
  async (req, res, next) => {
    try {
      const user = req.user;
      const { accessToken, refreshToken } = await service.generateToken(user);
      res.cookie('jwt', refreshToken, {
        httpOnly: true,
        sameSite: 'strict',
        secure: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
      res.json({ accessToken, refreshToken });
    } catch (error) {
      next(error);
    }
  }
);

router.post('/refresh', async (req, res, next) => {
  try {
    const refreshToken = req.cookies.jwt;
    if (!refreshToken) {
      throw boom.forbidden(`No tienes un token de refresh`);
    }
    const payload = jwt.verify(refreshToken, config.jwtRefreshToken);
    const user = await service.findOne(payload.sub);
    if (!user) {
      throw boom.forbidden(`Usuario invalido`);
    }
    const newPayload = {
      sub: user.id,
      role: user.role,
    };
    const accestoken = jwt.sign(newPayload, config.jwtSecret, {
      expiresIn: '15m',
    });
    return res.json(accestoken);
  } catch (error) {
    next(error);
  }
});

router.post('/recovery', async (req, res, next) => {
  try {
    const { email } = req.body;
    const rta = await service.sendRecoveryPassword(email);
    res.json(rta);
  } catch (error) {}
});

router.post('/change-password', async (req, res, next) => {
  try {
    const { token, newPassword } = req.body;
    const rta = await service.changePassword(token, newPassword);
    res.json(rta);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
