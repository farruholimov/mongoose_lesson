const { HomeGetController } = require("../controllers/HomeRouteController");
const UserMiddleware = require("../middlewares/UserMiddleware");

const router = require("express").Router();

router.get("/", UserMiddleware, (req, res) => {
	console.log("REQ_USER", req.user);
	res.render("index", {
		user: req.user,
	});
});


module.exports = {
	path: "/",
	router,
};
