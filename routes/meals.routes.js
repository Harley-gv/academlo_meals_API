const express = require('express');

const mealsRouter = express.Router();

//Middlewares
const { mealExists } = require('../middlewares/mealExists.middleware');
const {
  protectSession,
  verifyUserRol,
} = require('../middlewares/auth.middleware');
const {
  restaurantExists,
} = require('../middlewares/restaurantExists.middleware');
const {
  createMeal,
  allMeals,
  mealsById,
  updateMeal,
  deletMeal,
} = require('../controllers/meal.controller');
const {
  createMealsValidators,
} = require('../middlewares/validations.middleware');

//endpoints

mealsRouter.get('/', allMeals);
mealsRouter.get('/:id', mealExists, mealsById);

//security endpoints

mealsRouter.use(protectSession);
mealsRouter.post('/:id', createMealsValidators, restaurantExists, createMeal);
mealsRouter.patch('/:id', mealExists, verifyUserRol, updateMeal);
mealsRouter.delete('/:id', mealExists, verifyUserRol, deletMeal);

module.exports = { mealsRouter };