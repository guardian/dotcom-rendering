import Ajv from 'ajv';
import type { Options } from 'ajv';
import addFormats from 'ajv-formats';
import type { ContentApiContentType } from 'content-api-content-type';
import data from '../../fixtures/manual/frontend-article-with-capiContent.json';
import schema from '../model/content-api-content-schema.json';

const options: Options = {
	verbose: false,
	allErrors: false,
	logger: false,
	useDefaults: 'empty',
};

const ajv = new Ajv(options);
addFormats(ajv);

const validate = ajv.compile<ContentApiContentType>(schema);

it('validates capiContent from frontend correctly', () => {
	// The validator returns false if it doesn't parse
	expect(validate(data.capiContent)).not.toBe(false);
});
