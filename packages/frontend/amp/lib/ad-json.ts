// Passed raw as configuration to the ad
interface KV {
    name: string;
    value: string;
}

interface AdJson {
    targeting: KV[];
}

export const adJson = (targeting?: AdTargetParam[]): AdJson => {
    if (!targeting) {
        return { targeting: [] };
    }

    let json = targeting.map(p => ({
        name: p.name,
        value: p.values.join(','),
    }));

    json = json.filter(p => p.name !== 'p');
    json.push({ name: 'p', value: 'amp' });
    json.push({ name: 'rp', value: 'dotcom-rendering' });

    return { targeting: json };
};

export const stringify = (json: AdJson): string => {
    interface Map {
        [key: string]: string;
    }
    const targeting = json.targeting.reduce(
        (params, param) => {
            params[param.name] = param.value;
            return params;
        },
        {} as Map,
    );

    return JSON.stringify({ targeting });
};
