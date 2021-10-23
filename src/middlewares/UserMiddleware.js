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
					session_id: data.session_id,
				},
				include: [{
					model: req.db.users
				}],
			})


		if (!session) {
			next();
			return;
		}

		const user = await req.db.users.findOne({
			where: {
				user_id: session.dataValues.user_id
			}
		}, {raw: true})


		req.user = user.dataValues;

		next();
	} catch (error) {
		console.log(error);
		next();
	}
};
