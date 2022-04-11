const TJS = require('typescript-json-schema');
const { resolve } = require('path');

const root = resolve(__dirname, '..', '..');
const fs = require('fs');

const program = TJS.getProgramFromFiles(
	[resolve(`${root}/src/lib/content.d.ts`), resolve(`${root}/index.d.ts`)],
	{
		skipLibCheck: true,
	},
);

const settings = { rejectDateType: true, required: true };
const schema = TJS.generateSchema(program, 'CAPIArticleType', settings);
const frontSchema = TJS.generateSchema(program, 'FEFrontType', settings);

fs.writeFile(
	`${root}/src/model/json-schema.json`,
	JSON.stringify(schema, null, 4),
	'utf8',
	(err) => {
		if (err) {
			// eslint-disable-next-line @typescript-eslint/tslint/config
			console.log(err);
		}
	},
);

fs.writeFile(
	`${root}/src/model/front-schema.json`,
	JSON.stringify(frontSchema, null, 4),
	'utf8',
	(err) => {
		if (err) {
			// eslint-disable-next-line @typescript-eslint/tslint/config
			console.log(err);
		}
	},
);
