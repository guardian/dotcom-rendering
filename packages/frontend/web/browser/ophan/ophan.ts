interface ABTestRecord {
    variantName: string;
    complete: string | boolean;
}

interface ABTestPayload {
    abTestRegister: { [key: string]: ABTestRecord };
}

export const sendOphanPlatformRecord = () => {
    if (
        window.guardian &&
        window.guardian.ophan &&
        window.guardian.ophan.record
    ) {
        window.guardian.ophan.record({ experiences: 'dotcom-rendering' });

        // Record server-side AB test variants (i.e. control or variant)
        if (window.guardian.config.tests) {
            const tests = window.guardian.config.tests;
            window.guardian.ophan.record(abTestPayload(tests));
        }
    } else {
        throw new Error("window.guardian.ophan.record doesn't exist");
    }
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

export const recordPerformance = () => {
    const performanceAPI = window.performance;
    const supportsPerformanceProperties =
        performanceAPI &&
        'navigation' in performanceAPI &&
        'timing' in performanceAPI;

    if (!supportsPerformanceProperties) {
        return;
    }

    const timing = performanceAPI.timing;

    const allStartedModules = window.guardian.config.modules.started;
    const marks = window.performance.getEntriesByType('mark').filter(mark => {
        // We store our module marks as module-start and module-end
        // and our startedModules as the module name. Lets split it
        // out so that we can measure ours and only our marks.
        const ourModuleMark = mark.name.split('-');
        return (
            allStartedModules.includes(ourModuleMark && ourModuleMark[0]) ||
            mark.name.includes('commercial') // Commercial record is in a different format as from Frontend
        );
    });

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
        assetsPerformance: marks.map(mark => ({
            name: mark.name,
            timing: Math.floor(mark.startTime),
        })),
    };

    window.guardian.ophan.record({
        performance,
    });
};
