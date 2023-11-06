import { SSM } from "@aws-sdk/client-ssm";
import type { Credentials } from 'aws-sdk/lib/core';
import {
	CredentialProviderChain,
	EC2MetadataCredentials,
	SharedIniFileCredentials,
} from 'aws-sdk/lib/core';
import { Region } from './appIdentity';

const credentialProvider = new CredentialProviderChain([
	(): Credentials => new SharedIniFileCredentials({ profile: 'mobile' }),
	(): Credentials => new EC2MetadataCredentials(),
]);

export const ssm: SSM = new SSM({
    region: Region,

    // The transformation for credentialProvider is not implemented.
    // Refer to UPGRADING.md on aws-sdk-js-v3 for changes needed.
    // Please create/upvote feature request on aws-sdk-js-codemod for credentialProvider.
    credentialProvider: credentialProvider
});
