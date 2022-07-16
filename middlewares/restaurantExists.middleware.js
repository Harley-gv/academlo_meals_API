const { Restaurant } = require('../models/restaurant.model');

const { AppError } = require('../utils/appError.util');
const { catchAsync } = require('../utils/catchAsync.util');

const restaurantExists = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { meal } = req;

  const restaurant = await Restaurant.findOne({
    where: { id: id || meal.restaurantId, status: 'active' },
  });

  if (!restaurant) {
    return next(new AppError('Restaurant not found or not active', 403));
  }

  next();
});

module.exports = { restaurantExists };