const { AdsGetController, AdsPostController, AdsMoreGetController } = require('../controllers/AdsRouteController');

const router = require('express').Router();

router.get('/new_ad', AdsGetController)
router.get('/:slug', AdsMoreGetController)

router.post('/add', AdsPostController)

module.exports = {
    path: "/ads",
    router
}