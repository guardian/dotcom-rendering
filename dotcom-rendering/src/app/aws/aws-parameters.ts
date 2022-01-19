import {
	GetParametersByPathCommand,
	SSMClient,
	GetParametersByPathCommandOutput,
	Parameter,
	GetParametersByPathRequest,
} from '@aws-sdk/client-ssm';

process.env.AWS_PROFILE = 'frontend';
const ssm = new SSMClient({ region: 'eu-west-1' });
const STACK = 'frontend';

interface ConfigMap {
	[key: string]: any;
}

interface GuardianConfiguration {
	getParameter: (key: string) => string;
	getAllParameters: () => any;
	size: () => number;
}

// gets params from AWS parameter store. This is a PAGED api, the token
// indicates the next set of results to get (or undefined for the first call)

const getParams = function getAWSParameterStoreParameters(
	stage: string,
	token: string | undefined = undefined,
): Promise<GetParametersByPathCommandOutput> {
	const params: GetParametersByPathRequest = {
		Path: `/${STACK}/${stage}/`,
		Recursive: true,
		WithDecryption: true,
		NextToken: token,
	};

	const command = new GetParametersByPathCommand(params);
	return ssm.send(command);
};

// a recursive function to retrieve all pages of guardian configuration

const getAllParams = function getGuardianConfigurationRecursiveStep(
	stage: string,
	params: Parameter[] = [],
	token: string | undefined = undefined,
): Promise<Parameter[]> {
	return getParams(stage, token).then((response) => {
		if (!response.NextToken) {
			return params;
		}
		return getAllParams(
			stage,
			params.concat(response.Parameters || []),
			response.NextToken === '' ? undefined : response.NextToken,
		);
	});
};

// returns a configuration object

const getGuardianConfiguration = (
	stage: string,
): Promise<GuardianConfiguration> => {
	return getAllParams(stage).then((params) => {
		const configuration: ConfigMap = params.reduce(
			(map, p) =>
				p.Name
					? {
							...map,
							[p.Name]: p.Value,
					  }
					: { ...map },
			{},
		);

		return {
			getParameter: (key: string) =>
				configuration[`/${STACK}/${stage}/${key}`],
			getAllParameters: () => configuration,
			size: () => params.length,
		};
	});
};

export { getGuardianConfiguration, GuardianConfiguration };
