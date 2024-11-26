const _storage = require("#lib/storage");

const upload = async (file) => {
	return await _storage.generateUploadUrl(file);
};

const download = async (file) => {
	return await _storage.getUrlSigned(file);
};

module.exports = {
	upload,
	download,
};
