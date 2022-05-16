const TJS = require('typescript-json-schema');
const path = require('path');

const root = path.resolve(__dirname, '..', '..');

const program = TJS.getProgramFromFiles(
	[
		path.resolve(`${root}/src/lib/content.d.ts`),
		path.resolve(`${root}/index.d.ts`),
	],
	{
		skipLibCheck: true,
	},
);

const settings = { rejectDateType: true, required: true };

module.exports = {
	getArticleSchema: () => {
		return JSON.stringify(
			TJS.generateSchema(program, 'CAPIArticleType', settings),
			null,
			4,
		);
	},
	getFrontSchema: () => {
		return JSON.stringify(
			TJS.generateSchema(program, 'FEFrontType', settings),
			null,
			4,
		);
	},
};
