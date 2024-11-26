const Joi = require("joi");

const paramGuid = {
	params: Joi.object({
		id: Joi.string().guid({ version: "uuidv4" }).required().label("ID"),
	}),
};

const paramString = {
	params: Joi.object({
		id: Joi.string().required().label("ID"),
	}),
};

const paramEmail = {
	params: Joi.object({
		email: Joi.string().email({ tlds: false }).required().label("Email"),
	}),
};

const queryString = {
	query: Joi.object({
		value: Joi.string().required().label("Value"),
	}),
};

const queryFile = {
	query: Joi.object({
		file: Joi.string().required().label("File"),
	}),
};

module.exports = {
	paramGuid,
	paramString,
	queryString,
	paramEmail,
	queryFile,
};
