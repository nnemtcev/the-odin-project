const express = require('express');
const router = express.Router();

const gameCategoryControllers = require('../controllers/gameCategoryControllers');

router.get('/inventory/category/:id', gameCategoryControllers.getGameCategoryDetail);

router.get('/inventory/category/create', gameCategoryControllers.createGameCategory);

module.exports = router;
