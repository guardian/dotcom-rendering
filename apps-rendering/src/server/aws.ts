import { fromIni, fromInstanceMetadata } from '@aws-sdk/credential-providers';
import { chain as providerChain } from '@smithy/property-provider';
import { SSM } from '@aws-sdk/client-ssm';
import { Region } from './appIdentity';

const credentialProvider = providerChain([
	fromIni({ profile: 'mobile' }),
	fromInstanceMetadata(),
]);

export const ssm: SSM = new SSM({
	region: Region,
	credentials: credentialProvider
});
