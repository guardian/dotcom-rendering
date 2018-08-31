// @flow

process.env.AWS_PROFILE = 'frontend';

const AWS = require('aws-sdk');

AWS.config.update({ region: 'eu-west-1' });

const STACK = 'frontend';

const ssm = new AWS.SSM();

// gets params from AWS parameter store. This is a PAGED api, the token
// indicates the next set of results to get (or undefined for the first call)

const getParams = function getAWSParameterStoreParameters(stage: string, token=undefined) {

    const params = {
        Path: `/${STACK}/${stage}/`,
        Recursive: true,
        WithDecryption: true,
        NextToken: token,
    };

    return ssm.getParametersByPath(params).promise();

};

// a recursive function to retrieve all pages of guardian configuration

const getAllParams = function getGuardianConfigurationRecursiveStep(stage: string, params=[], token=undefined) {
    return getParams(stage, token).then((response)=>{
        if (!response.NextToken) {
            return params;
        } else {
            return getAllParams(
                stage,
                params.concat(response.Parameters),
                response.NextToken === "" ? undefined : response.NextToken
            );
        }
    });
};

// returns a configuration object

const getGuardianConfiguration = function(stage: string) {
    return getAllParams(stage).then((params)=>{

        const configuration = params.reduce(function(map, p) {
            const newMap = map;
            newMap[p.Name] = p.Value;
            return map;
        }, {});

        return {
            getParameter: (key) => configuration[`/${STACK}/${stage}/${key}`],
            getAllParameters: () => configuration,
            size: () => params.length,
        };

    })
};

module.exports = {
    getGuardianConfiguration
};
