const path = require('path');
const fs = require('fs');

const root = path.resolve(__dirname, '..', '..');
const { getArticleSchema, getFrontSchema } = require('./get-schema');

const existingArticleSchema = fs.readFileSync(
	`${root}/src/model/article-schema.json`,
	{ encoding: 'utf-8' },
);
const existingFrontSchema = fs.readFileSync(
	`${root}/src/model/front-schema.json`,
	{ encoding: 'utf-8' },
);

const articleSchema = getArticleSchema();
const frontSchema = getFrontSchema();

if (
	existingArticleSchema !== articleSchema ||
	existingFrontSchema !== frontSchema
) {
	throw new Error('Schemas do not match ... please run "make gen-schema"');
} else {
	console.log('Schemas match!');
}
