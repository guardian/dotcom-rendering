// Passed raw as configuration to the ad
interface KV {
    name: string;
    value: string;
}

interface AdJson {
    targeting: KV[];
}

export const adJson = (
    edition: Edition,
    editionAdTargetings: EditionAdTargeting[],
): AdJson => {
    const targeting = editionAdTargetings.find(t => t.edition === edition);

    if (!targeting) {
        return { targeting: [] };
    }

    let json = targeting.paramSet.map(p => ({
        name: p.name,
        value: p.values.join(','),
    }));

    json = json.filter(p => p.name !== 'p');
    json.push({ name: 'p', value: 'amp' });

    return { targeting: json };
};
