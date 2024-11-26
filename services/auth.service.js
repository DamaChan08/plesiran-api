const jwt = require("jsonwebtoken");
const _model = require("#models/auth.model");
const _password = require("#lib/password");
const { CustomError } = require("#lib/cutomerror");
const { secretKey } = require("#config/vars");
const _storage = require("#lib/storage");

const register = async (body) => {
	body.password = await _password.hashPassword(body.password);
	const user = await _model.getUserByEmail(body.email);

	if (user) {
		throw new CustomError(
			"email or phone number or username already exist",
			409,
		);
	}

	return _model.insert(body);
};

const login = async (body) => {
	const user = await _model.getUserByEmail(body.email);
	const passwords = await _password.comparePassword(
		body.password,
		user?.password || "",
	);

	if (!passwords || !user) {
		throw new CustomError("Invalid Password", 400);
	}
	const { password, ...userData } = user;
	const token = jwt.sign(userData, secretKey, { expiresIn: "15m" });
	const refresh_token = jwt.sign(userData, secretKey, { expiresIn: "1h" });
	userData.profile_image = await _storage.getUrlSigned(userData.profile_image);
	return {
		...userData,
		token,
		refresh_token,
	};
};

module.exports = {
	register,
	login,
};
