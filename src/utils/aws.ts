import {CredentialProviderChain, ECSCredentials, SharedIniFileCredentials} from "aws-sdk";
import {Region} from "./appIdentity";
import SSM from "aws-sdk/clients/ssm";


const credentialProvider = new CredentialProviderChain([
    function () { return new ECSCredentials(); },
    function () { return new SharedIniFileCredentials({
        profile: "mobile"
    }); }                                                                            
]);

export const ssm: SSM  = new SSM({
    region: Region ,
    credentialProvider: credentialProvider
});
