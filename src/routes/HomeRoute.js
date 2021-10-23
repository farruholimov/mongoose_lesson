const { HomeGetController } = require("../controllers/HomeRouteController");
const UserMiddleware = require("../middlewares/UserMiddleware");

const router = require("express").Router();

router.get("/", UserMiddleware, (req, res) => {
	
	res.render("index", {
		user: req.user,
	});
});


module.exports = {
	path: "/",
	router,
};
