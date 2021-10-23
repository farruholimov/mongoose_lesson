const Joi = require("joi");

module.exports = class Validations {
	static async SignUpValidation(data) {
		return await Joi.object({
			name: Joi.string()
				.required()
				.min(3)
				.max(32)
				.trim()
				.error(new Error("Name is invalid")),
			email: Joi.string()
				.email()
				.required()
				.trim()
				.lowercase()
				.error(new Error("Email is invalid")),
			password: Joi.string()
				.required()
				.error(new Error("Password is invalid")),
		}).validateAsync(data);
	}
	static async LoginValidation(data) {
		return await Joi.object({
			email: Joi.string()
				.email()
				.required()
				.trim()
				.lowercase()
				.error(new Error("Email is invalid")),
			password: Joi.string()
				.required()
				.error(new Error("Password is invalid")),
		}).validateAsync(data);
	}

	static async AddAdsValidation(data) {
		return await Joi.object({
			title: Joi.string()
				.required()
				.min(2)
				.max(128)
				.trim()
				// .error(new Error("Sarlavhada xato bor."))
				,
			price: Joi.number()
				.min(0)
				.required()
				.error(new Error("Narxda xato bor")),
			description: Joi.string()
				.required()
				.min(8)
				.max(1024)
				.error(new Error("Ta'rifda xato bor.")),
			category: Joi.string()
				.required()
				.error(new Error("Kategoriyada xato bor.")),
			phone: Joi.string()
				.required()
				.error(new Error("Raqam o'zbekistonniki emas"))
				.pattern(/^998(9[012345789]|6[125679]|7[01234569])[0-9]{7}$/),
		}).validateAsync(data);
	}
};
