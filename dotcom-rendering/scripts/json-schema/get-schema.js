const path = require('node:path');
const TJS = require('typescript-json-schema');

const root = path.resolve(__dirname, '..', '..');

const program = TJS.getProgramFromFiles(
	[
		path.resolve(`${root}/index.d.ts`),
		path.resolve(`${root}/src/types/frontend.ts`),
		path.resolve(`${root}/src/types/tagPage.ts`),
		path.resolve(`${root}/src/types/newslettersPage.ts`),
	],
	{
		skipLibCheck: true,
	},
);

const settings = { rejectDateType: true, required: true };

const getArticleSchema = () => {
	return JSON.stringify(
		TJS.generateSchema(program, 'FEArticleType', settings),
		null,
		4,
	);
};

const getFrontSchema = () => {
	return JSON.stringify(
		TJS.generateSchema(program, 'FEFrontType', settings),
		null,
		4,
	);
};

const getTagPageSchema = () => {
	return JSON.stringify(
		TJS.generateSchema(program, 'FETagPageType', settings),
		null,
		4,
	);
};

const getNewsletterPageSchema = () => {
	return JSON.stringify(
		TJS.generateSchema(program, 'FENewslettersPageType', settings),
		null,
		4,
	);
};

const getBlockSchema = () => {
	return JSON.stringify(
		TJS.generateSchema(program, 'Block', settings),
		null,
		4,
	);
};

module.exports = {
	getArticleSchema,
	getFrontSchema,
	getTagPageSchema,
	getNewsletterPageSchema,
	getBlockSchema,
};
