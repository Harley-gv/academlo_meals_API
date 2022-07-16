const express = require('express');

const restaurantRouter = express.Router();

//middleware
const {
  restaurantExists,
} = require('../middlewares/restaurantExists.middleware');
const { reviewExists } = require('../middlewares/reviewExists.middleware');
const {
  protectSession,
  verifyUserRol,
  verifySession,
} = require('../middlewares/auth.middleware');
const {
  createRestaurantValidators,
} = require('../middlewares/validations.middleware');

//constrollers
const {
  newRestaurant,
  allRestaurant,
  restaurantById,
  updateRestaurant,
  deletRestaurant,
  newReviewRestaurant,
  updateReview,
  deleteReview,
} = require('../controllers/restaurant.controller');

//endpoints

//restaurants
restaurantRouter.get('/', allRestaurant);
restaurantRouter.get('/:id', restaurantExists, restaurantById);

//security endpoints

restaurantRouter.use(protectSession);

restaurantRouter.post('/', createRestaurantValidators, newRestaurant);

//restaurants reviews
restaurantRouter.post('/reviews/:restaurantId', newReviewRestaurant);
restaurantRouter.patch(
  '/reviews/:id',
  reviewExists,
  verifySession,
  updateReview
);
restaurantRouter.delete(
  '/reviews/:id',
  reviewExists,
  verifySession,
  deleteReview
);

//Restaurant functions
restaurantRouter
  .use('/:id', restaurantExists)
  .route('/:id')
  .patch(verifyUserRol, updateRestaurant)
  .delete(verifyUserRol, deletRestaurant);

module.exports = { restaurantRouter };