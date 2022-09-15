import { GetParametersByPathCommand, SSMClient } from '@aws-sdk/client-ssm';

process.env.AWS_PROFILE = 'frontend';
const ssm = new SSMClient({ region: 'eu-west-1' });
const env = process.env.NODE_ENV === 'production' ? 'prod' : 'dev';

async function* scrollParameters(params) {
	let command = new GetParametersByPathCommand(params);
	let response = await ssm.send(command);

	while (true) {
		const parameters = response.Parameters;

		// SSM returns undefined if there are no parameters
		if (parameters === undefined) {
			break;
		}

		for (const parameter of parameters) {
			yield parameter;
		}

		if (!response.NextToken) {
			break;
		}

		command = new GetParametersByPathCommand({
			Path: `/dotcom/${env}/`,
			Recursive: true,
			WithDecryption: true,
			NextToken: response.NextToken,
		});
		response = ssm.send(command);
	}
}

export async function getAwsSsmParameters() {
	const parameters = {};
	const params = {
		Path: `/dotcom/${env}/`,
		Recursive: true,
		WithDecryption: true,
	};

	for await (const parameter of scrollParameters(params)) {
		const key = parameter.Name.replace(`/dotcom/${env}/`, '');
		parameters[key] = parameter.Value;
	}

	return parameters;
}
