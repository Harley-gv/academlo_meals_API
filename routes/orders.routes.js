const express = require('express');

const ordersRouter = express.Router();

//controllers
const {
    createAOrder,
    getAllOrders,
    editOrderStatus,
    cancelOrder,
} = require('../controllers/order.controller');

//middlewares
const {
    protectSession,
    verifySession,
} = require('../middlewares/auth.middleware');
const { mealExists } = require('../middlewares/mealExists.middleware');
const { orderExists } = require('../middlewares/orderExists.middleware');
const {
    restaurantExists,
} = require('../middlewares/restaurantExists.middleware');
const {
    createOrderValidator,
} = require('../middlewares/validations.middleware');



//endpoints
ordersRouter.use(protectSession);

ordersRouter.post(
    '/',
    createOrderValidator,
    mealExists,
    restaurantExists,
    createAOrder
);
ordersRouter.get('/me', getAllOrders);
ordersRouter
    .route('/:id')
    .patch(orderExists, verifySession, editOrderStatus)
    .delete(orderExists, verifySession, cancelOrder);

module.exports = { ordersRouter };