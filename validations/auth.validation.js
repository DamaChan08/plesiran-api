const Joi = require("joi");

const loginBody = {
	body: Joi.object({
		email: Joi.string().email().required().label("Email"),
		password: Joi.string().required().label("Password"),
	}),
};

const registerBody = {
	body: Joi.object({
		nama: Joi.string().required().label("Full Name"),
		email: Joi.string().email({ tlds: false }).required().label("Email"),
		phone: Joi.string().required().label("Phone Number"),
		password: Joi.string().required().label("Password"),
	}),
};

module.exports = {
	loginBody,
	registerBody,
};
