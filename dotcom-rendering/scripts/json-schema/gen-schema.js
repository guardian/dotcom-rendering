const path = require('path');

const root = path.resolve(__dirname, '..', '..');
const fs = require('fs');
const { generateArticleSchema, generateFrontSchema } = require('./schema');

const articleSchema = generateArticleSchema();
const frontSchema = generateFrontSchema();

fs.writeFile(
	`${root}/src/model/json-schema.json`,
	articleSchema,
	'utf8',
	(err) => {
		if (err) {
			// eslint-disable-next-line @typescript-eslint/tslint/config
			console.log(err);
		}
	},
);

fs.writeFile(
	`${root}/src/model/front-schema.json`,
	frontSchema,
	'utf8',
	(err) => {
		if (err) {
			// eslint-disable-next-line @typescript-eslint/tslint/config
			console.log(err);
		}
	},
);
