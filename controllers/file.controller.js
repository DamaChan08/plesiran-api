const _service = require("#services/file.service");

const upload = async (req, res) => {
	const { file } = req.body;
	const result = await _service.upload(file);
	res.status(200).send({ status: true, uri: result });
};

const download = async (req, res) => {
	const { file } = req.body;
	const result = await _service.download(file);
	res.status(200).send({ status: true, uri: result });
};

module.exports = {
	upload,
	download,
};
