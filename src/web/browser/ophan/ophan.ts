interface ABTestRecord {
    variantName: string;
    complete: string | boolean;
}

interface ABTestPayload {
    abTestRegister: { [key: string]: ABTestRecord };
}

export type OphanAction = 'INSERT' | 'VIEW';

export type OphanComponentType = 'ACQUISITIONS_EPIC' | 'ACQUISITIONS_ENGAGEMENT_BANNER';

export type TestMeta = {
    abTestName: string;
    abTestVariant: string;
    campaignCode: string;
    campaignId?: string;
};

export const sendOphanContributionsComponentEvent = (
    action: OphanAction,
    testMeta: TestMeta,
    componentType: OphanComponentType
): void => {
    const componentEvent = {
        component: {
            componentType,
            products: ['CONTRIBUTION', 'MEMBERSHIP_SUPPORTER'],
            campaignCode: testMeta.campaignCode,
            id: testMeta.campaignId || testMeta.campaignCode,
        },
        abTest: {
            name: testMeta.abTestName,
            variant: testMeta.abTestVariant,
        },
        action,
    };

    window.guardian.ophan.record({ componentEvent });
};

export const abTestPayload = (tests: {
    [key: string]: string;
}): ABTestPayload => {
    const records: { [key: string]: ABTestRecord } = {};
    Object.keys(tests).forEach(testName => {
        records[`ab${testName}`] = {
            variantName: tests[testName],
            complete: false,
        };
    });

    return { abTestRegister: records };
};

export const sendOphanPlatformRecord = () => {
    if (
        window.guardian &&
        window.guardian.ophan &&
        window.guardian.ophan.record
    ) {
        window.guardian.ophan.record({ experiences: 'dotcom-rendering' });

        // Record server-side AB test variants (i.e. control or variant)
        if (window.guardian.config.tests) {
            const { tests } = window.guardian.config;
            window.guardian.ophan.record(abTestPayload(tests));
        }
    } else {
        throw new Error("window.guardian.ophan.record doesn't exist");
    }
};

export const recordPerformance = () => {
    const performanceAPI = window.performance;
    const supportsPerformanceProperties =
        performanceAPI &&
        'navigation' in performanceAPI &&
        'timing' in performanceAPI;

    if (!supportsPerformanceProperties) {
        return;
    }

    const { timing } = performanceAPI;

    const performance = {
        dns: timing.domainLookupEnd - timing.domainLookupStart,
        connection: timing.connectEnd - timing.connectStart,
        firstByte: timing.responseStart - timing.connectEnd,
        lastByte: timing.responseEnd - timing.responseStart,
        domContentLoadedEvent:
            timing.domContentLoadedEventStart - timing.responseEnd,
        loadEvent: timing.loadEventStart - timing.domContentLoadedEventStart,
        navType: performanceAPI.navigation.type,
        redirectCount: performanceAPI.navigation.redirectCount,
    };

    window.guardian.ophan.record({
        performance,
    });
};
