require("dotenv").config();

module.exports = {
	baseUrl: process.env.BASE_URL,
	port: process.env.PORT,
	nodeEnv: process.env.NODE_ENV,
	urlPrefix: process.env.URL_PREFIX,
	secretKey: process.env.SECRET_KEY,

	dbClient: process.env.DB_CLIENT,
	dbHost: process.env.DB_HOST,
	dbPort: process.env.DB_PORT,
	dbUser: process.env.DB_USER,
	dbPassword: process.env.DB_PASSWORD,
	dbName: process.env.DB_NAME,

	defaultTimeout: parseInt(process.env.DEFAULT_TIMEOUT || 780000, 10),

	r2Endpoint: process.env.R2_ENDPOINT,
	r2AccessKey: process.env.R2_ACCESS_KEY,
	r2SecretKey: process.env.R2_SECRET_KEY,
	r2Bucket: process.env.R2_BUCKET,
};
