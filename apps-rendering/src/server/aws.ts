import AWS from 'aws-sdk';
import { fromIni, fromInstanceMetadata } from "@aws-sdk/credential-providers";
import { chain as providerChain } from "@smithy/property-provider";
import { SSM } from "@aws-sdk/client-ssm";
import { Region } from './appIdentity';

const credentialProvider = // JS SDK v3 switched credential providers from classes to functions.
// The CredentialProviderChain is now a chain of providers.
// Reference: https://www.npmjs.com/package/@aws-sdk/credential-providers
providerChain([
	(): AWS.Credentials => // JS SDK v3 switched credential providers from classes to functions.
    // This is the closest approximation from codemod of what your application needs.
    // Reference: https://www.npmjs.com/package/@aws-sdk/credential-providers
    fromIni({ profile: 'mobile' }),
	(): AWS.Credentials => // JS SDK v3 switched credential providers from classes to functions.
    // This is the closest approximation from codemod of what your application needs.
    // Reference: https://www.npmjs.com/package/@aws-sdk/credential-providers
    fromInstanceMetadata(),
]);

export const ssm: SSM = new SSM({
    region: Region,

    // The transformation for credentialProvider is not implemented.
    // Refer to UPGRADING.md on aws-sdk-js-v3 for changes needed.
    // Please create/upvote feature request on aws-sdk-js-codemod for credentialProvider.
    credentialProvider: credentialProvider
});
