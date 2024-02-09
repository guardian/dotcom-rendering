/* eslint-disable no-console -- logs are useful in scripts */
const fs = require('node:fs');
const path = require('node:path');
const {
	getArticleSchema,
	getFrontSchema,
	getNewsletterPageSchema,
	getTagPageSchema,
	getBlockSchema,
} = require('./get-schema');

const root = path.resolve(__dirname, '..', '..');

const existingArticleSchema = fs.readFileSync(
	`${root}/src/model/article-schema.json`,
	{ encoding: 'utf-8' },
);
const existingFrontSchema = fs.readFileSync(
	`${root}/src/model/front-schema.json`,
	{ encoding: 'utf-8' },
);
const existingTagPageSchema = fs.readFileSync(
	`${root}/src/model/tag-page-schema.json`,
	{ encoding: 'utf-8' },
);
const existingNewsletterSchema = fs.readFileSync(
	`${root}/src/model/newsletter-page-schema.json`,
	{ encoding: 'utf-8' },
);
const existingBlockSchema = fs.readFileSync(
	`${root}/src/model/block-schema.json`,
	{ encoding: 'utf-8' },
);

const articleSchema = getArticleSchema();
const frontSchema = getFrontSchema();
const tagPageSchema = getTagPageSchema();
const newsletterSchema = getNewsletterPageSchema();
const blockSchema = getBlockSchema();

if (
	existingArticleSchema !== articleSchema ||
	existingFrontSchema !== frontSchema ||
	existingTagPageSchema !== tagPageSchema ||
	existingNewsletterSchema !== newsletterSchema ||
	existingBlockSchema !== blockSchema
) {
	throw new Error('Schemas do not match ... please run "make gen-schema"');
} else {
	console.log('Schemas match!');
}
