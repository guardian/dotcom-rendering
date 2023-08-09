/* eslint-disable no-console -- Logs are useful for scripts */
import fs from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
	getArticleSchema,
	getBlockSchema,
	getFrontSchema,
	getNewsletterPageSchema,
	getTagFrontSchema,
} from './get-schema.js';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..');

const articleSchema = getArticleSchema();
const frontSchema = getFrontSchema();
const tagFrontSchema = getTagFrontSchema();
const newsletterPageSchema = getNewsletterPageSchema();
const blockSchema = getBlockSchema();

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

fs.writeFile(
	`${root}/src/model/tag-front-schema.json`,
	tagFrontSchema,
	'utf8',
	(err) => {
		if (err) {
			console.log(err);
		}
	},
);

fs.writeFile(
	`${root}/src/model/newsletter-page-schema.json`,
	newsletterPageSchema,
	'utf8',
	(err) => {
		if (err) {
			console.log(err);
		}
	},
);

fs.writeFile(
	`${root}/src/model/block-schema.json`,
	blockSchema,
	'utf8',
	(err) => {
		if (err) {
			console.log(err);
		}
	},
);
