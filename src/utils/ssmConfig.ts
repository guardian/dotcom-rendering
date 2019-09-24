import {ssm} from "./aws";
import {App, Stack, Stage} from "./appIdentity";
import {Option} from "./option";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Config = {[key: string]: any};

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

let state: Option<Config> = null;

async function fetchConfig(): Promise<Config> {
    if (state == null) {
        const config = await recursivelyFetchConfig();
        state = config;
        return config;
    } else {
        return Promise.resolve(state);
    }
}

export async function getConfigValue<A>(key: string, defaultValue?: A): Promise<A> {
    const conf = await fetchConfig();
    if (conf[key]) {
        return conf[key];
    }
    else {
        if (defaultValue) {
            return defaultValue;
        }
        else {
            throw new Error(`No config value for key: /${App}/${Stage}/${Stack}/${key}`);
        }
    }
}