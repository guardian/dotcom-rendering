import type { Option } from '../../vendor/@guardian/types/index';
import { none, OptionKind, some } from '../../vendor/@guardian/types/index';
import { App, Stack, Stage } from './appIdentity';
import { ssm } from './aws';

type Config = Record<string, string | undefined>;

async function recursivelyFetchConfig(
	nextToken?: string,
	currentConfig?: Config,
): Promise<Config> {
	const path = `/${App}/${Stage}/${Stack}/`;
	const result = await ssm.getParametersByPath({
		Path: path,
		WithDecryption: true,
		NextToken: nextToken,
	});
	const fetchedConfig: Config = {};
	if (result.Parameters) {
		result.Parameters.forEach((param) => {
			if (param.Name) {
				const name = param.Name.replace(path, '');
				fetchedConfig[name] = param.Value;
			}
		});
	}
	const config = Object.assign({}, currentConfig, fetchedConfig);
	if (result.NextToken) {
		return recursivelyFetchConfig(result.NextToken, config);
	} else {
		return Promise.resolve(config);
	}
}

let state: Option<Config> = none;

async function getState(): Promise<Config> {
	const config = await recursivelyFetchConfig();
	state = some(config);
	return config;
}

async function fetchConfig(): Promise<Config> {
	if (state.kind === OptionKind.Some) {
		return Promise.resolve(state.value);
	}

	return getState();
}

export async function getConfigValue(
	key: string,
	defaultValue?: string,
): Promise<string | undefined> {
	if (process.env.GITHUB_ACTIONS) {
		// my.var.name is not a valid env var
		return process.env[key.toUpperCase().replace(/\./g, '_')];
	}

	const conf = await fetchConfig();

	if (conf[key]) {
		return conf[key];
	} else {
		if (defaultValue) {
			return defaultValue;
		} else {
			throw new Error(
				`No config value for key: /${App}/${Stage}/${Stack}/${key}`,
			);
		}
	}
}
