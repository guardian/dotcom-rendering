import { verifyDictionaryName, getService } from './fastly-api.ts';

import { parseArgs } from 'jsr:@std/cli/parse-args';
import * as env from './env.ts';
import { deployABTests } from './deploy-ab-tests.ts';
import { deployMVTs } from './deploy-mvts.ts';

const flags = parseArgs(Deno.args, {
	string: ['mvts', 'ab-tests'],
});

if (!flags['mvts'] || !flags['ab-tests']) {
	console.error(
		'Please provide the path to the mvt and ab test groups dictionaries',
	);
	Deno.exit(1);
}

const service = await getService(env.SERVICE_ID);
if (service.name !== env.SERVICE_NAME) {
	throw new Error(
		`Service ID ${env.SERVICE_ID} does not match the expected service name ${env.SERVICE_NAME}`,
	);
}

const activeVersion = service.versions?.find(
	(v: { active: boolean }) => v.active,
);

if (!activeVersion) {
	throw new Error(`No active version found for service ${env.SERVICE_NAME}`);
}

// Verify that the service ID and dictionary names match the expected values
verifyDictionaryName({
	serviceId: env.SERVICE_ID,
	activeVersion: activeVersion.number,
	dictionaryName: env.MVTS_DICTIONARY_NAME,
	dictionaryId: env.MVTS_DICTIONARY_ID,
});

verifyDictionaryName({
	serviceId: env.SERVICE_ID,
	activeVersion: activeVersion.number,
	dictionaryName: env.TEST_GROUPS_DICTIONARY_NAME,
	dictionaryId: env.TEST_GROUPS_DICTIONARY_ID,
});

deployABTests(flags['ab-tests']);

deployMVTs(flags['mvts']);

console.log('Successfully updated ab test groups and mvt groups dictionaries');
