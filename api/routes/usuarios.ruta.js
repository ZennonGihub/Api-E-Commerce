const express = require('express')
const UserServices = require('./../services/usuarios.services')
const validatorHandler = require('./../middlewares/validator.handler')
const { createUser, updateUser, getUser, deleteUser } = require('./../schemas/usuarios.schema')

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

router.get('/:id',
  validatorHandler(getUser, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await service.findOne(id);
      res.json(user);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/register',
validatorHandler(createUser, 'body'),
async (req, res, next) => {
  try {
    const body = req.body;
    const newUser = await service.create(body);
    res.status(201).json(newUser);
  } catch (err) {
    next(err)
  }
});

router.get('/Login', async (req, res, next) => {
    try
    {
    const user = await service.findOne()
    } catch (error) {

    }
})

router.delete('borrarCuenta',
  validatorHandler(deleteUser, 'params')
)

//router.patch()

module.exports = router;
