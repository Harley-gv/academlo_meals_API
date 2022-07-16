const express = require('express');
const rateLimit = require('express-rate-limit');

//Routers
const { restaurantRouter } = require('./routes/restaurant.routes');
const { usersRouter } = require('./routes/users.routes');
const { mealsRouter } = require('./routes/meals.routes');
const { ordersRouter } = require('./routes/orders.routes');

//Global error controller
const { globalErrorHandler } = require('./controllers/globalErrorHandler.controller');

//Utils
const { AppError } = require('./utils/appError.util');


//init app
const app = express();

app.use(express.json());

//limiter
const limiter = rateLimit({
    max: 10000,
    windowMs: 60 * 60 * 1000,
    message: 'locked, Number of request have been exceded',
});

app.use(limiter);

//endpoints
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/restaurants', restaurantRouter);
app.use('/api/v1/meals', mealsRouter);
app.use('/api/v1/orders', ordersRouter);

//Handle incoming unknown routes to the server
app.all('*', (req, res, next) => {
    next(
        new AppError(
            `${req.method} ${req.originalUrl} not found in this server`,
            404
        )
    );
});

//GobalErrorHandler
app.use(globalErrorHandler);

module.exports = { app };