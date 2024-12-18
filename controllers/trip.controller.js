const service = require("#services/trip.service");

const getAll = async (req, res) => {
	const { query } = req;
	const result = await service.getAll(query);
	return res.json({
		status: true,
		data: result,
	});
};

const getById = async (req, res) => {
    const { params } = req;
	const result = await service.getById(params.id);
	return res.json({
		status: true,
		data: result,
	});
}

const insert = async (req, res) => {
    const { body } = req;
	await service.insert(body);
	return res.json();
}

const update = async (req, res) => {
    const { params, body } = req;
	await service.update(params.id, body);
	return res.json();
}


const remove = async (req, res) => {
    const { params } = req;
	await service.remove(params.id);
	return res.json();
}

module.exports = {
    getAll,
    getById,
    insert,
    update,
    remove
}