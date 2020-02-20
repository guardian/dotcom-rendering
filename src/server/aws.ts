import {SharedIniFileCredentials, CredentialProviderChain, EC2MetadataCredentials, Credentials} from "aws-sdk/lib/core";
import {Region} from "./appIdentity";
import SSM from "aws-sdk/clients/ssm";


const credentialProvider = new CredentialProviderChain([
    (): Credentials => new SharedIniFileCredentials({profile: "mobile"}),
    (): Credentials => new EC2MetadataCredentials()
]);

export const ssm: SSM  = new SSM({
    region: Region ,
    credentialProvider: credentialProvider
});
