const Joi = require("joi");
const { getSkipAndTake } = require("#utils/helper");

const generalDataTable = {
	query: Joi.object({
		page: Joi.number().default(1),
		limit: Joi.number().default(10),
		keyword: Joi.string().optional().default("").allow(""),
		direction: Joi.string().optional().default("asc").allow(""),
		sorting: Joi.string().optional().default(null).allow(""),
	}).custom((value) => {
		const { page: pageNumber, limit: pageSize } = value;
		const { offset, limit } = getSkipAndTake(pageNumber, pageSize);
		return {
			...value,
			page: offset,
			limit,
			direction: value.direction === "asc" ? "asc" : "desc",
		};
	}),
};

module.exports = {
	generalDataTable,
};
