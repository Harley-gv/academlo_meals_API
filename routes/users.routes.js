const express = require('express');

const usersRouter = express.Router();

//controllers
const {
  createUser,
  login,
  updateUser,
  deleteUser,
  getAllUserOrders,
  getUserOrderById,
} = require('../controllers/user.controller');


//middlewares
const {
  protectSession,
  verifyUserAccount,
} = require('../middlewares/auth.middleware');
const {
  createUserValidators,
} = require('../middlewares/validations.middleware');

const { userExists } = require('../middlewares/userExists.middleware');

//endpoints
usersRouter.post('/signup', createUserValidators, createUser);

usersRouter.post('/login', login);

usersRouter.use(protectSession);

usersRouter.get('/orders', getAllUserOrders);

usersRouter.get('/orders/:id', getUserOrderById);

usersRouter
  .use('/:id', userExists)
  .route('/:id')
  .patch(verifyUserAccount, updateUser)
  .delete(verifyUserAccount, deleteUser);

module.exports = { usersRouter };