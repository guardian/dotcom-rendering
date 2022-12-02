const path = require('path');

const root = path.resolve(__dirname, '..', '..');
const fs = require('fs');
const { getArticleSchema, getFrontSchema } = require('./get-schema');

const articleSchema = getArticleSchema();
const frontSchema = getFrontSchema();

fs.writeFile(
	`${root}/src/model/article-schema.json`,
	articleSchema,
	'utf8',
	(err) => {
		if (err) {
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
			console.log(err);
		}
	},
);
