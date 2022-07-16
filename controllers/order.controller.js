const { Order } = require('../models/order.model');
const { Meal } = require('../models/meal.model');
const { Restaurant } = require('../models/restaurant.model');

const { catchAsync } = require('../utils/catchAsync.util');
const { AppError } = require('../utils/appError.util');


const createAOrder = catchAsync(async (req, res, next) => {
  const { sessionUser, meal } = req;
  const { mealId, quantity } = req.body;

  const totalPrice = meal.price * quantity;

  const order = await Order.create({
    mealId,
    userId: sessionUser.id,
    totalPrice,
    quantity,
  });

  res.status(200).json({
    status: 'success',
    order,
  });
});
const getAllOrders = catchAsync(async (req, res, next) => {
  const { sessionUser } = req;

  const orders = await Order.findAll({
    where: { userId: sessionUser.id, status: 'active' },
    attributes: ['id', 'mealId', 'totalPrice', 'quantity', 'status'],
    include: [
      {
        model: Meal,
        attributes: ['name', 'price'],
        include: [
          { model: Restaurant, attributes: ['name', 'address', 'rating'] },
        ],
      },
    ],
  });

  if (!orders) {
    return new AppError('You dont have active orders', 400);
  }

  res.status(200).json({
    status: 'success',
    orders,
  });
});
const editOrderStatus = catchAsync(async (req, res, next) => {
  const { order } = req;

  await order.update({ status: 'completed' });

  res.status(200).json({
    status: 'success',
    message: 'order completed',
  });
});
const cancelOrder = catchAsync(async (req, res, next) => {
  const { order } = req;

  await order.update({ status: 'cancelled' });

  res.status(200).json({
    status: 'success',
    message: 'order cancelled',
  });
});

module.exports = { createAOrder, getAllOrders, editOrderStatus, cancelOrder };