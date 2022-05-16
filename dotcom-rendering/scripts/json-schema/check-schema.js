const path = require('path');
const core = require('@actions/core');
const fs = require('fs');

const root = path.resolve(__dirname, '..', '..');
const { generateArticleSchema, generateFrontSchema } = require('./gen-schema');

const existingArticleSchema = fs.readFileSync(
	`${root}/src/model/json-schema.json`,
	{ encoding: 'utf-8' },
);
const existingFrontSchema = fs.readFileSync(
	`${root}/src/model/front-schema.json`,
	{ encoding: 'utf-8' },
);

// eslint-disable-next-line @typescript-eslint/no-floating-promises
(async () => {
	const articleSchema = generateArticleSchema();
	const frontSchema = generateFrontSchema();

	if (
		existingArticleSchema !== articleSchema ||
		existingFrontSchema !== frontSchema
	) {
		await core.summary
			.addHeading('Schema Check Results')
			.addRaw('Schemas do not match ❌ \n Please run:')
			.addCodeBlock('make gen-schema')
			.addDetails('Why do I need to do this?', `TODO!`)
			.write();
		throw new Error(
			'Schemas do not match ... please run "make gen-schema"',
		);
	} else {
		console.log('Schemas match!');
	}
})();
