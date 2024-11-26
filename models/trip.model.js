const { knex } = require("#config/database");

const getAll = async (query) => {
    const mainQuery = knex("trip_tour")
        .modify((builder) => {
            if (query.keyword) {
				builder.whereRaw("LOWER(title) like ?", `%${query.keyword}%`);
			}
        });
	const { count } = await mainQuery
        .clone()
        .clearSelect()
		.clearOrder()
        .count("id as count")
        .first();
	const result = await mainQuery.clone().limit(query.limit).offset(query.page);

	return { result, count };
}

const getById = async (id) => {
    return knex("trip_tour").where("id",id).first();
}

const insert = async (data) => {
    return knex("trip_tour").insert(data);
}

const update = async (id, data) => {
    return knex("trip_tour").update(data).where("id", id);
}

const remove = async (id) => {
    return knex("trip_tour").where("id",id).del();
}

module.exports = {
    getAll,
    getById,
    insert,
    update,
    remove
}