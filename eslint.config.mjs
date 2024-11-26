import globals from "globals";
import pluginJs from "@eslint/js";

export default [
	{
		languageOptions: {
			globals: {
				...globals.node,
				...globals.commonjs,
			},
		},
		rules: {
			"no-console": "warn",
			"no-unused-vars": "warn",
			semi: ["error", "always"],
			quotes: ["error", "double"],
		},
	},
	pluginJs.configs.recommended,
];
