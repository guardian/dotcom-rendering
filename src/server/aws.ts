import {SharedIniFileCredentials, CredentialProviderChain, EC2MetadataCredentials} from "aws-sdk/lib/core";
import {Region} from "./appIdentity";
import SSM from "aws-sdk/clients/ssm";


const credentialProvider = new CredentialProviderChain([
    function (): EC2MetadataCredentials { return new EC2MetadataCredentials(); },
    function (): SharedIniFileCredentials{ return new SharedIniFileCredentials({
        profile: "mobile"
    }); }                                                                            
]);

export const ssm: SSM  = new SSM({
    region: Region ,
    credentialProvider: credentialProvider
});
