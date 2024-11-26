const swaggerJsdoc = require("swagger-jsdoc");
const validation = require("#validations/index");
const j2s = require("joi-to-swagger");
const pick = require("#utils/pick");
const { nodeEnv, baseUrl } = require("#config/vars");

const componentSchema = () => {
	const schemas = {};
	const parameters = {};

	Object.keys(validation).forEach((key) => {
		Object.keys(validation[key]).forEach((key2) => {
			const picked = pick(validation[key][key2], ["body", "query", "params"]);
			Object.keys(picked).forEach((key3) => {
				const schema = j2s(picked[key3]).swagger;
				if (key3 === "query") {
					parameters[key2] = {
						name: key2,
						in: "query",
						schema: schema,
					};
				} else if (key3 === "params") {
					let newSchema = {};
					Object.keys(schema.properties).forEach((key4) => {
						newSchema = {
							in: "path",
							name: key4,
							schema: schema.properties[key4],
							required: schema.required.includes(key4),
						};
					});
					parameters[key2] = newSchema;
				} else {
					schemas[key2] = schema;
				}
			});
		});
	});

	return { schemas, parameters };
};

const { schemas, parameters } = componentSchema();

const options = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "API DOCS",
			version: "1.0.0",
		},
		servers: [
			{
				url: baseUrl,
				description: `API Server ${nodeEnv}`,
			},
		],
		components: {
			schemas: schemas,
			parameters: parameters,
			securitySchemes: {
				BearerAuth: {
					type: "http",
					scheme: "bearer",
					bearerFormat: "JWT",
				},
			},
		},
	},
	apis: ["./routes/**/*.js"],
};

const specs = swaggerJsdoc(options);

module.exports = specs;
