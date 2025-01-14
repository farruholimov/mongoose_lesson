const users = require("../models/UserModel");
const { SignUpValidation, LoginValidation } = require("../modules/validations");
const { generateHash, compareHash } = require("../modules/bcrypt");
const { email: sendEmail } = require("../modules/email");
const { createToken } = require("../modules/jwt");
const { isValidObjectId } = require("mongoose");
const sessions = require("../models/SessionsModel");

module.exports = class UserRouteController {
	static async UserRegistrationGetController(req, res) {
		res.render("registration");
	}
	static async UserLoginGetController(req, res) {
		res.render("login");
	}
	static async UserSignUpPostController(req, res) {
		try {
			const { name, email, password } = await SignUpValidation(req.body);


			const user = await req.db.users.create({
				user_name:  name,
				user_email: email,
				user_password: await generateHash(password),
			}); 

			// await sendEmail(
			// 	email,
			// 	"Iltimos pochtangizni tasdiqlang",
			// 	`Pochtangizni tasdiqlash uchun link`,
			// 	`<a href="http://localhost:8000/users/verify/${user._id}"/>Tasdiqlash</a>`
			// );

			// console.log(`http://10.10.129.48:8000/users/verify/${user.id}`);

			res.redirect("/users/login");
		} catch (error) {
			console.log(error);
			res.render("registration", {
				error: error + "",
			});
		}
	}
	static async UserVerifyGetController(req, res) {
		try {
			const id = req.params.id;

			if (!id) throw new Error("Verification kalit xato)");

			if (!isValidObjectId(id))
				throw new Error("Verification kalit xato)");

			const user = await users.findOne({
				_id: id,
			});

			if (!user) throw new Error("Verification kalit xato)");

			let x = await users.updateOne(
				{
					_id: id,
				},
				{
					isVerified: true,
				}
			);

			res.cookie(
				"token",
				await createToken({
					id: user.id,
				})
			).redirect("/");
		} catch (error) {
			res.render("login", {
				error: error + "",
			});
		}
	}
	static async UserLoginPostController(req, res) {
		try {
			const { email, password } = await LoginValidation(req.body);

			const user = await req.db.users.findOne({
				where: {
					user_email: email
				},
			},{raw: true});

			if (!user) throw new Error("User topilmadi");

			if (!(await compareHash(password, user.user_password)))
				throw new Error("Parol xato");

			await req.db.sessions.destroy({
				where: {
					session_user_agent: req.headers["user-agent"],
					user_id: user.user_id,
				}
			});

			const session = await req.db.sessions.create({
				session_user_agent: req.headers["user-agent"],
				user_id: user.user_id,
			});

			res.cookie(
				"token",
				await createToken({
					session_id: session.dataValues.session_id,
				})
			).redirect("/");
		} catch (error) {
			console.log(error);
			res.render("login", {
				error: error + "",
			});
		}
	}

	static async UserExitGetController(req, res) {
		res.clearCookie("token").redirect("/");
	}
	static async UserProfileGetController(req, res) {

		const user = await req.db.users.findOne({
			where: {
				user_id: req.params?.id
			}
		});

		if (!user) {
			res.redirect("/");
			return 0;
		}

		res.render("profile", {
			user: req.user,
			profile: user,
			isOwnProfile: req.user.user_id === user.user_id ? true : false,
		});
	}

	static async UserSessionsGetController(req, res) {
		try {
			const user_sessions = await req.db.sessions.findAll({
				where: {
					user_id: req.user.user_id,
				}
			});

			console.log(user_sessions);

			res.render("sessions", {
				user: req.user,
				user_sessions: user_sessions,
			});
		} catch (error) {
			console.log(error);
			res.redirect("/");
		}
	}

	static async UserSessionDeleteController(req, res) {
		try {

			let x = await req.db.sessions.destroy({ 
				where: {
					user_id: req.user.user_id,
					session_id: req.params?.id,
				}
			});

			res.redirect("/users/sessions");
		} catch (error) {
			console.log(error);
			res.redirect("/users/sessions");
		}
	}
};
