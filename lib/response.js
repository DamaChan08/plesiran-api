const jwt = require("jsonwebtoken");
const DEFAULT_ERROR_OBJ = {
	status: "INTERNAL_SERVER_ERROR",
	statusCode: 500,
	message: "Request failed unexpectedly!",
	errors: "",
};

/**
 * Error handler
 * @param {object} req Express request object
 * @param {object} res Express response object
 * @param {number} status Http code
 * @param {object} data object of error that will be sent to client
 * @param {object} error object of error that will be sent to client
 * @param {boolean} createLog should create log
 * @returns
 */
const errorHelper = (
	req,
	res,
	status = 500,
	data = DEFAULT_ERROR_OBJ,
	error = undefined,
) => {
	console.log(error);
	if (error?.name === "CustomError") {
		status = error.code || 400;
		data.message = error.message || "Request failed unexpectedly!";
		data.statusCode = status;
	}
	// dont sent response to client if ERR_HTTP_HEADERS_SENT!
	if (res.headersSent) return;
	res.status(status).json(data);
};

/**
 * Error handler
 * @param {object} req Express request object
 * @param {object} res Express response object
 * @param {number} status Http code
 * @param {object} data object of error that will be sent to client
 * @returns
 */
const successHelper = (req, res, status = 200, data) => {
	// dont sent response to client if ERR_HTTP_HEADERS_SENT!
	if (res.headersSent) return;
	res.status(status).json(data);
};

module.exports = { errorHelper, successHelper };
