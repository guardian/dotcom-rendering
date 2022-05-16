const path = require('path');
const fs = require('fs');

const root = path.resolve(__dirname, '..', '..');
const { generateArticleSchema, generateFrontSchema } = require('./schema');

const existingArticleSchema = fs.readFileSync(
	`${root}/src/model/json-schema.json`,
	{ encoding: 'utf-8' },
);
const existingFrontSchema = fs.readFileSync(
	`${root}/src/model/front-schema.json`,
	{ encoding: 'utf-8' },
);

const articleSchema = generateArticleSchema();
const frontSchema = generateFrontSchema();

if (
	existingArticleSchema !== articleSchema ||
	existingFrontSchema !== frontSchema
) {
	throw new Error('Schemas do not match ... please run "make gen-schema"');
} else {
	console.log('Schemas match!');
}
