import {SharedIniFileCredentials, CredentialProviderChain, ECSCredentials} from "aws-sdk/lib/core";
import {Region} from "./appIdentity";
import SSM from "aws-sdk/clients/ssm";


const credentialProvider = new CredentialProviderChain([
    function (): ECSCredentials { return new ECSCredentials(); },
    function (): SharedIniFileCredentials{ return new SharedIniFileCredentials({
        profile: "mobile"
    }); }                                                                            
]);

export const ssm: SSM  = new SSM({
    region: Region ,
    credentialProvider: credentialProvider
});
