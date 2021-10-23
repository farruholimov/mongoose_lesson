const { HomeGetController } = require("../controllers/HomeRouteController");
const UserMiddleware = require("../middlewares/UserMiddleware");

const router = require("express").Router();

router.get("/", UserMiddleware, HomeGetController);


module.exports = {
	path: "/",
	router,
};
