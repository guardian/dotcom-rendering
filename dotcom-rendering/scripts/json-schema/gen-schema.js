const path = require('path');

const root = path.resolve(__dirname, '..', '..');
const fs = require('fs');
const {
	getArticleSchema,
	getFrontSchema,
	getContentApiContentSchema,
} = require('./get-schema');

const contentApiContentSchema = getContentApiContentSchema();
const articleSchema = getArticleSchema();
const frontSchema = getFrontSchema();

fs.writeFile(
	`${root}/src/model/content-api-content-schema.json`,
	contentApiContentSchema,
	'utf8',
	(err) => {
		if (err) {
			console.log(err);
		}
	},
);

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
