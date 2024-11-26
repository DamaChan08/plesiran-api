const { knex } = require("#config/database");

const getUserByEmail = async (email) => {
	return knex("users").select("*").where("email", email).first();
};

const insert = async (payload) => {
	return knex("users").insert(payload);
};

module.exports = {
	getUserByEmail,
	insert,
};
