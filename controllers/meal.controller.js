const { Meal } = require('../models/meal.model');
const { Restaurant } = require('../models/restaurant.model');

const { catchAsync } = require('../utils/catchAsync.util');
const { AppError } = require('../utils/appError.util');

const createMeal = catchAsync(async (req, res, next) => {
    const { restaurant } = req;
    const { name, price } = req.body;

    const newMeal = await Meal.create({
        name,
        price,
        restaurantId: restaurant.id,
    });

    res.status(201).json({
        status: 'success',
        newMeal,
    });
});

const allMeals = catchAsync(async (req, res, next) => {
    const data = await Meal.findAll({
        where: { status: 'active' },
        include: [
            {
                model: Restaurant,
                required: false,
                where: { status: 'active' },
                attributes: ['name', 'address'],
            },
        ],
    });

    data.map((dataValues) => {
        if (dataValues.dataValues.restaurant === null) {
            dataValues.dataValues.restaurant =
                'restaurant not available';
        }
    });

    res.status(200).json({
        status: 'success',
        data,
    });
});

const mealsById = catchAsync(async (req, res, next) => {
    const { meal } = req;

    const data = await Meal.findOne({
        where: { status: 'active', id: meal.id },
        include: [
            {
                model: Restaurant,
                required: false,
                where: { status: 'active' },
                attributes: ['name', 'address'],
            },
        ],
    });

    if (!data) {
        return new AppError('Please check Meal', 400);
    }

    if (data.dataValues.restaurant === null) {
        data.dataValues.restaurant = 'restaurant not available';
    }

    res.status(200).json({
        status: 'success',
        data,
    });
});

const updateMeal = catchAsync(async (req, res, next) => {
    const { meal } = req;
    const { name, price } = req.body;

    await meal.update({
        name,
        price,
    });

    res.status(204).json({});
});

const deletMeal = catchAsync(async (req, res, next) => {
    const { meal } = req;

    await meal.update({
        status: 'deleted',
    });

    res.status(200).json({
        status: 'success',
    });
});

module.exports = {
    createMeal,
    allMeals,
    mealsById,
    updateMeal,
    deletMeal,
};