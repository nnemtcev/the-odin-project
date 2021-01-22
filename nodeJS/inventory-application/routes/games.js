const express = require('express');
const router = express.Router();

const gameControllers = require('../controllers/gameControllers');

router.get('/', function(req, res) {
    res.redirect('/inventory');
});

router.get('/inventory', gameControllers.getGamesAndCategories);

router.get('/inventory/game/:id', gameControllers.getGameDetail);

router.get('/inventory/game/create', gameControllers.createGame);

router.get('/inventory/game/delete/:id', gameControllers.deleteGame);

router.get('/inventory/game/edit/:id', gameControllers.editGame);

module.exports = router;
