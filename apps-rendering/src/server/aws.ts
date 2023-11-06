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

    // The transformation for credentialProvider is not implemented.
    // Refer to UPGRADING.md on aws-sdk-js-v3 for changes needed.
    // Please create/upvote feature request on aws-sdk-js-codemod for credentialProvider.
    credentialProvider: credentialProvider
});
