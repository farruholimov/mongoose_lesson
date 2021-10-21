const sessions = require("../models/SessionsModel");
const { checkToken } = require("../modules/jwt");

module.exports = async function UserMiddleware(req, res, next) {
	try {
		if (!req.cookies.token) {
			next();
			return;
		}
		const data = await checkToken(req.cookies.token);

		if (!data) {
			next();
			return;
		}

		const session = await req.db.sessions
			.findOne({
				where: {
					id: data.session_id,
				},
				include: req.db.users,
			})

		console.log("SESSION: ",session);

		if (!session) {
			next();
			return;
		}

		req.user = session.owner_id;

		next();
	} catch (error) {
		next();
	}
};
