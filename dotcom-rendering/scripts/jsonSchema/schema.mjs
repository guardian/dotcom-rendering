// @ts-check
import path from 'node:path';
import fs from 'node:fs';
import TJS from 'typescript-json-schema';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..', '..');

const program = TJS.getProgramFromFiles(
	[
		path.resolve(`${root}/index.d.ts`),
		path.resolve(`${root}/src/types/frontend.ts`),
		path.resolve(`${root}/src/types/tagPage.ts`),
		path.resolve(`${root}/src/types/newslettersPage.ts`),
		path.resolve(`${root}/src/types/editionsCrossword.ts`),
		path.resolve(`${root}/src/feFootballDataPage.ts`),
	],
	{
		skipLibCheck: true,
	},
);

const settings = { rejectDateType: true, required: true };

/**
 * The list of data types that may be sent to DCAR from frontend. They will
 * have JSON schemas auto-generated and stored in the corresponding files.
 * These schemas will then be used to validate the requests that come from
 * frontend.
 *
 * @typedef {{ typeName: string; file: string; }} Schema
 * @type Schema[]
 */
const schemas = [
	{
		typeName: 'FEArticleType',
		file: `${root}/src/model/article-schema.json`,
	},
	{
		typeName: 'FEFrontType',
		file: `${root}/src/model/front-schema.json`,
	},
	{
		typeName: 'FETagPageType',
		file: `${root}/src/model/tag-page-schema.json`,
	},
	{
		typeName: 'FENewslettersPageType',
		file: `${root}/src/model/newsletter-page-schema.json`,
	},
	{
		typeName: 'Block',
		file: `${root}/src/model/block-schema.json`,
	},
	{
		typeName: 'FEEditionsCrosswords',
		file: `${root}/src/model/editions-crossword-schema.json`,
	},
	{
		typeName: 'FEFootballDataPage',
		file: `${root}/src/model/fe-football-data-page-schema.json`,
	},
];

/**
 * Generates a JSON schema from a TS type.
 *
 * @param {Schema} schema
 * @returns {string} A JSON schema as a string
 */
const getSchema = (schema) =>
	JSON.stringify(
		TJS.generateSchema(program, schema.typeName, settings),
		null,
		4,
	);

/**
 * Reads a JSON schema from a file.
 *
 * @param {Schema} schema
 * @returns {string} A JSON schema as a string
 */
const readSchema = (schema) =>
	fs.readFileSync(schema.file, { encoding: 'utf-8' });

/**
 * Generates a JSON schema for a TS type and writes it to a file.
 *
 * @param {Schema} schema
 */
const writeSchema = (schema) =>
	fs.writeFile(schema.file, getSchema(schema), 'utf8', (err) => {
		if (err) {
			console.log(err);
		}
	});

/**
 * Generates a fresh JSON schema for each TS type and compares them to those
 * stored on the filesystem. If any do not match, throws an error.
 */
export const checkSchemas = () => {
	for (const schema of schemas) {
		if (getSchema(schema) !== readSchema(schema)) {
			throw new Error(
				'Schemas do not match ... please run "make gen-schemas"',
			);
		}
	}

	console.log('Schemas match!');
};

/**
 * Generates a JSON schema for each TS type and writes it to the filesystem.
 */
export const genSchemas = () => {
	for (const schema of schemas) {
		writeSchema(schema);
	}
};
