// routes/router.js
const express = require('express');
const pizzasRouter = require('../pizzas/pizzas');
const ingredientRouter = require('../ingredients/ingredients');

const router = express.Router();

router.use('/pizzas', pizzasRouter);
router.use('/ingredients', ingredientRouter);

module.exports = router;
