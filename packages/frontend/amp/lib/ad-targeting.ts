export const buildAdTargeting = (config: ConfigType): AdTargeting => {
    const customParams = {
        sens: config.isSensitive ? 't' : 'f',
        si: 'f',
        vl: config.videoDuration,
        cc: config.edition,
        s: config.section,
        inskin: 'f',
        ...config.sharedAdTargeting,
        pa: 'f',
    };
    return {
        customParams,
        adUnit: config.adUnit,
    };
};
