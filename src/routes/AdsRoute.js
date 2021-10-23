const { AdsGetController, AdsPostController } = require('../controllers/AdsRouteController');

const router = require('express').Router();

router.get('/new_ad', AdsGetController)

router.post('/add', AdsPostController)

module.exports = {
    path: "/ads",
    router
}