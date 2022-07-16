const { Review } = require('../models/review.model');
const { Restaurant} = require('../models/restaurant.model');

const { catchAsync } = require('../utils/catchAsync.util');
const { AppError } = require('../utils/appError.util');

const newRestaurant = catchAsync(async (req, res, next) => {
  const { name, address, rating } = req.body;

  const newRestaurant = await Restaurant.create({
    name,
    address,
    rating,
  });

  res.status(201).json({
    status: 'success',
    newRestaurant,
  });
});

const allRestaurant = catchAsync(async (req, res, next) => {
  const data = await Restaurant.findAll({
    where: { status: 'active' },
    attributes: ['name', 'address', 'rating', 'id', 'status'],
    include: [
      {
        model: Review,
        required: false,
        where: { status: 'active' },
        attributes: ['comment', 'rating'],
      },
    ],
  });

  res.status(200).json({
    data,
  });
});

const restaurantById = catchAsync(async (req, res, next) => {
  const { restaurant } = req;

  res.status(200).json({
    restaurant,
  });
});

const updateRestaurant = catchAsync(async (req, res, next) => {
  const { name, address } = req.body;
  const { restaurant } = req;

  await restaurant.update({
    name,
    address,
  });

  res.status(204).json({});
});

const deletRestaurant = catchAsync(async (req, res, next) => {
  const { restaurant } = req;

  await restaurant.update({ status: 'delete' });

  res.status(204).json({});
});

const newReviewRestaurant = catchAsync(async (req, res, next) => {
  const { sessionUser } = req;
  const { comment, rating } = req.body;
  const { restaurantId } = req.params;

  const rest = await Restaurant.findOne({
    where: { id: restaurantId, status: 'active' },
  });
  if (!rest) {
    return next(
      new AppError('This restaurant is not available at this moment', 400)
    );
  }

  const newReview = await Review.create({
    userId: sessionUser.id,
    restaurantId,
    comment,
    rating,
  });

  res.status(201).json({
    status: 'success',
    newReview,
  });
});

const updateReview = catchAsync(async (req, res, next) => {
  const { comment, rating } = req.body;
  const { review } = req;

  await review.update({
    comment,
    rating,
  });

  res.status(204).json({});
});

const deleteReview = catchAsync(async (req, res, next) => {
  const { review } = req;

  await review.update({
    status: 'deleted',
  });

  res.status(204).json({});
});

module.exports = {
  newRestaurant,
  allRestaurant,
  restaurantById,
  updateRestaurant,
  deletRestaurant,
  newReviewRestaurant,
  updateReview,
  deleteReview,
};