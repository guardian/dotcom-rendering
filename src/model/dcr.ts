const makeDcrConfig = (CAPI: CAPIType, GA: GADataType): DcrConfig => {
    return {
        isDev: process.env.NODE_ENV !== 'production',
        GA,
        ajaxUrl: CAPI.config.ajaxUrl,
        shortUrlId: CAPI.config.shortUrlId,
        pageId: CAPI.config.pageId,
        isPaidContent: !!CAPI.config.isPaidContent,
        showRelatedContent: CAPI.config.showRelatedContent,
        keywordIds: CAPI.config.keywordIds,
        ampIframeUrl: CAPI.config.ampIframeUrl,
        // commercialBundleUrl is only used in SSR
        // commercialBundleUrl: CAPI.config.commercialBundleUrl,

        // switches
        cmpUi: CAPI.config.switches.cmpUi,
        slotBodyEnd: CAPI.config.switches.slotBodyEnd,
        ampPrebid: CAPI.config.switches.ampPrebid,
        permutive: CAPI.config.switches.permutive,

        // used by lib/ad-targeting.ts
        isSensitive: CAPI.config.isSensitive,
        videoDuration: CAPI.config.videoDuration,
        edition: CAPI.config.edition,
        section: CAPI.config.section,
        sharedAdTargeting: CAPI.config.sharedAdTargeting, // missing type definition
        adUnit: CAPI.config.adUnit,
    };
};

export const makeDcr = (CAPI: CAPIType, GA: GADataType): DcrType => ({
    config: makeDcrConfig(CAPI, GA),
});
