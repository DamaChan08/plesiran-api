const model = require("#model/trip.model");
const storage = require("#lib/storage");
const { CustomError } = require("#lib/cutomerror");

const getAll = async (query) => {
	const { result, count } = await _model.getAll(query);
	await Promise.all(
		result.map(async (item) => {
			if (item.image) {
				item.image_url = await _storage.getUrlSigned(item.Image);
			}
		}),
	);

	return {
		result,
		count,
	};
};

const getById = async (id) => {
    const item = await model.getById(id);
    if(!item){
        throw new CustomError("Not Data", 204);
    }

    if(item.image){
        item.image_url = await _storage.getUrlSigned(item.Image);
    }

    return item;
}

const insert = async (data) => {
    return await model.insert(data)
}

const update = async (id, data) => {
    return await model.update(id, data)
}

const remove = async (id) => {
    return await model.remove(id)
}

module.exports = {
	getAll,
    getById,
    insert,
    update,
    remove
};

