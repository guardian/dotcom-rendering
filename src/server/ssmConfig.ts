import { ssm } from './aws';
import { App, Stack, Stage } from './appIdentity';
import { Option, some, none, map, withDefault } from '@guardian/types/option';
import { pipe2 } from 'lib';

type Config = {[key: string]: string | undefined};

async function recursivelyFetchConfig(nextToken?: string, currentConfig?: Config): Promise<Config> {
    const path = `/${App}/${Stage}/${Stack}/`;
    const result = await ssm.getParametersByPath({
        Path: path,
        WithDecryption: true,
        NextToken: nextToken
    }).promise();
    const fetchedConfig: Config = {};
    if (result.Parameters) {
        result.Parameters.forEach(param => {
            if (param.Name) {
                const name = param.Name.replace(path, '');
                fetchedConfig[name] = param.Value;
            }
        });
    }
    const config = Object.assign({}, currentConfig, fetchedConfig);
    if (result.NextToken) {
        return recursivelyFetchConfig(result.NextToken, config);
    }
    else {
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
    return pipe2(
        state,
        map(s => Promise.resolve(s)),
        withDefault(getState()),
    );
}

export async function getConfigValue(
    key: string,
    defaultValue?: string,
): Promise<string | undefined> {
    const conf = await fetchConfig();

    if (conf[key]) {
        return conf[key];
    } else {
        if (defaultValue) {
            return defaultValue;
        }
        else {
            throw new Error(`No config value for key: /${App}/${Stage}/${Stack}/${key}`);
        }
    }
}