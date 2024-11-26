const {
	defaultTimeout,
	dbClient,
	dbHost,
	dbPort,
	dbPassword,
	dbUser,
	dbName,
} = require("./config/vars");

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
	client: dbClient,
	connection: {
		host: dbHost,
		port: dbPort,
		user: dbUser,
		password: dbPassword,
		database: dbName,
		ssl: { rejectUnauthorized: true },
	},
	pool: {
		min: 2,
		max: 10,
	},
	defaultTimeout: defaultTimeout,
	acquireConnectionTimeout: defaultTimeout,
};
