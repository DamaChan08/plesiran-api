const _service = require("#services/auth.service");

const register = async (req, res) => {
	const { body } = req;
	await _service.register(body);
	res.status(200).json();
};

const login = async (req, res) => {
	const { body } = req;
	const user = await _service.login(body);
	res.status(200).json({
		status: true,
		data: user,
	});
};

module.exports = {
	register,
	login,
};
