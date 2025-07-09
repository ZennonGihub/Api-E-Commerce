const express = require('express');
const UserServices = require('../services/usuarios.services');
const validatorHandler = require('../middlewares/validator.handler');
const {
  createUser,
  updateUser,
  getUser,
  deleteUser,
} = require('../schemas/usuarios.schema');
const boom = require('@hapi/boom');

const router = express.Router();
const service = new UserServices();

router.get('/lista', async (req, res, next) => {
  try {
    const users = await service.find();
    res.json(users);
  } catch (error) {
    next(error);
  }
});

router.get(
  '/:id',
  validatorHandler(getUser, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await service.findOne(id);
      res.json(user);
    } catch (error) {
      next(error);
    }
  },
);

router.post(
  '/register',
  validatorHandler(createUser, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newUser = await service.create(body);
      res.status(201).json(newUser);
    } catch (err) {
      next(err);
    }
  },
);

router.get(
  '/Login',
  validatorHandler(getUser, 'body'),
  async (req, res, next) => {
    try {
    } catch (error) {}
  },
);

router.delete(
  '/borrarCuenta/:id',
  validatorHandler(deleteUser, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await service.delete(id);
      res.json({ message: `Usuario con ID ${id} eliminado correctamente` });
    } catch (error) {
      next(error);
    }
  },
);

router.patch(
  '/cambiarDatos/:id',
  validatorHandler(getUser, 'params'),
  validatorHandler(updateUser, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      if (!id) {
        throw boom.badRequest('No se encontro el id');
      }
      const changes = req.body;
      const updateuser = await service.update(id, changes);
      res.json(updateuser);
    } catch (error) {
      next(error);
    }
  },
);

module.exports = router;
