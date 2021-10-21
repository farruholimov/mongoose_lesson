const express = require("express");
const PORT = process.env.PORT || 8000;
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const path = require("path");
const routes = require("./routes/routes");
const mongo = require("./modules/mongoose");
const UserMiddleware = require("./middlewares/UserMiddleware");
const postgres = require("./modules/database");

async function server(mode) {
	const app = express();
	app.listen(PORT, (_) => console.log(`SERVER READY AT ${PORT}`));

	try {
		// middlewares
		app.use(express.json());
		app.use(express.urlencoded({
			extended: true
		}));
		app.use(cookieParser());
		app.use("/public", express.static(path.join(__dirname, "public")));
		app.use(UserMiddleware);

		app.use(async (req, res, next) => {
			req.db = await postgres()
			next();
		});

		if (mode == "DEV") {
			app.use(morgan("dev"));
		}

		// settings
		app.set("view engine", "ejs");
		app.set("views", path.join(__dirname, "views"));
	} finally {
		routes(app);
	}
}

module.exports = server;