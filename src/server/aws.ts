import SSM from 'aws-sdk/clients/ssm';
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
	credentialProvider: credentialProvider,
});
