const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..', '..');
const {
	getArticleSchema,
	getFrontSchema,
	getNewsletterPageSchema,
} = require('./get-schema');

const existingArticleSchema = fs.readFileSync(
	`${root}/src/model/article-schema.json`,
	{ encoding: 'utf-8' },
);
const existingFrontSchema = fs.readFileSync(
	`${root}/src/model/front-schema.json`,
	{ encoding: 'utf-8' },
);
const existingNewsletterSchema = fs.readFileSync(
	`${root}/src/model/front-schema.json`,
	{ encoding: 'utf-8' },
);

const articleSchema = getArticleSchema();
const frontSchema = getFrontSchema();
const newsletterSchema = getNewsletterPageSchema();

if (
	existingArticleSchema !== articleSchema ||
	existingFrontSchema !== frontSchema ||
	existingNewsletterSchema !== newsletterSchema
) {
	throw new Error('Schemas do not match ... please run "make gen-schema"');
} else {
	console.log('Schemas match!');
}
