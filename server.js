const { app } = require('./app');
const { db } = require('./utils/db.util');

//import models
const { Meal } = require('./models/meal.model');
const { Order } = require('./models/order.model');
const { Restaurant } = require('./models/restaurant.model');
const { Review } = require('./models/review.model');
const { User } = require('./models/user.model');

//relations
//1Rest---M Review
Restaurant.hasMany(Review, { foreignKey: 'restaurantId' });
Review.belongsTo(Restaurant);

//1Rest--M Meal
Restaurant.hasMany(Meal, { foreignKey: 'restaurantId' });
Meal.belongsTo(Restaurant);

//1 User --M Review
User.hasMany(Review, { foreignKey: 'userId' });
Review.belongsTo(User);

//1 user -- M order
User.hasMany(Order, { foreignKey: 'userId' });
Order.belongsTo(User);

//1 meal -- 1 order
Meal.hasOne(Order, { foreignKey: 'mealId' });
Order.belongsTo(Meal);

const port = '5000'

db.authenticate()
    .then(() => console.log('db authenticate'))
    .catch((err) => console.log(err));

db.sync()
    .then(() => console.log('db sync'))
    .catch((err) => console.log(err));

app.listen(port, () => {
    console.log(`express server running on port: ${port}`);
});