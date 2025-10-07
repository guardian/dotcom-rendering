import { verifyDictionaryName, getService } from '../lib/fastly-api.ts';

import { parseArgs } from 'jsr:@std/cli/parse-args';
import {
	abTestsDictionaryId,
	abTestsDictionaryName,
	mvtDictionaryId,
	mvtDictionaryName,
	serviceId,
	serviceName,
} from '../lib/config.ts';
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

const service = await getService(serviceId);
if (service.name !== serviceName) {
	throw new Error(
		`Service ID ${serviceId} does not match the expected service name ${serviceName}`,
	);
}

const activeVersion = service.versions?.find(
	(v: { active: boolean }) => v.active,
);

if (!activeVersion) {
	throw new Error(`No active version found for service ${service.name}`);
}

// Verify that the service ID and dictionary names match the expected values
verifyDictionaryName({
	activeVersion: activeVersion.number,
	dictionaryName: mvtDictionaryName,
	dictionaryId: mvtDictionaryId,
});

verifyDictionaryName({
	activeVersion: activeVersion.number,
	dictionaryName: abTestsDictionaryName,
	dictionaryId: abTestsDictionaryId,
});

deployABTests(flags['ab-tests']);

deployMVTs(flags['mvts']);

console.log('Successfully updated ab test groups and mvt groups dictionaries');
