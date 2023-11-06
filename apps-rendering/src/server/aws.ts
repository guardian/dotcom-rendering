import AWS from 'aws-sdk';
import { Region } from './appIdentity';

const credentialProvider = new AWS.CredentialProviderChain([
	(): AWS.Credentials => new AWS.SharedIniFileCredentials({ profile: 'mobile' }),
	(): AWS.Credentials => new AWS.EC2MetadataCredentials(),
]);

export const ssm: AWS.SSM = new AWS.SSM({
	region: Region,
	credentialProvider: credentialProvider,
});
