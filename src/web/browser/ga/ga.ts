import { getCookie } from './cookie';

interface TrackerConfig {
    name: string;
    id: string;
    sampleRate: number;
    siteSpeedSampleRate: number;
}

const tracker: TrackerConfig = {
    name: 'allEditorialPropertyTracker',
    id: 'UA-78705427-1',
    sampleRate: 100,
    siteSpeedSampleRate: 1, // TODO Should be set to 0.1 when rolling out to wider audience
};

const getQueryParam = (
    key: string,
    queryString: string,
): string | undefined => {
    const params = queryString.substring(1).split('&');
    const pairs = params.map(x => x.split('='));

    return pairs
        .filter(xs => xs.length === 2 && xs[0] === key)
        .map(xs => xs[1])[0];
};

export const init = (): void => {
    const coldQueue = (...args: any[]) => {
        (window.ga.q = window.ga.q || []).push(args);
    };

    window.ga = window.ga || (coldQueue as UniversalAnalytics.ga);

    window.GoogleAnalyticsObject = 'ga';
    window.ga.l = +new Date();

    window.ga('create', tracker.id, 'auto', tracker.name, {
        sampleRate: tracker.sampleRate,
        siteSpeedSampleRate: tracker.siteSpeedSampleRate,
    });
};

// Adapted from https://web.dev/lcp/#measure-lcp-in-javascript
const trackLCP = (send: string) => {
    const { ga } = window;
    // Create a variable to hold the latest LCP value (since it can change).
    let lcp: number;

    if (!window.PerformanceObserver) {
        return;
    }

    // Create the PerformanceObserver instance.
    const po = new window.PerformanceObserver(entryList => {
        const entries = entryList.getEntries();
        const lastEntry = entries[entries.length - 1];

        // Update `lcp` to the latest value, using `renderTime` if it's available,
        // otherwise using `loadTime`. (Note: `renderTime` may not be available if
        // the element is an image and it's loaded cross-origin without the
        // `Timing-Allow-Origin` header.)
        lcp = lastEntry.renderTime || lastEntry.loadTime;
    });

    // Observe entries of type `largest-contentful-paint`, including buffered
    // entries, i.e. entries that occurred before calling `observe()`.
    try {
        // This inexplicably fires off an error instead of just ignoring a type it doesn't understand
        // until fairly recent browsers.
        // https://github.com/w3c/performance-timeline/issues/87
        // If we can't observer LCP, catch and return early.
        po.observe({ type: 'largest-contentful-paint', buffered: true });
    } catch {
        return;
    }

    // Send the latest LCP value to your analytics server once the user
    // leaves the tab.
    window.addEventListener(
        'visibilitychange',
        function fn() {
            if (lcp && document.visibilityState === 'hidden') {
                ga(
                    send,
                    'timing',
                    'Javascript Load', // Matches Frontend
                    'LCP', // Largest Contentful Paint (We can filter to DCR with the Dimension 43 segment)
                    Math.round(lcp),
                    'Largest Contentful Paint',
                );
                window.removeEventListener('visibilitychange', fn, true);
            }
        },
        true,
    );
};

export const sendPageView = (): void => {
    const { GA } = window.guardian.app.data;
    const set = `${tracker.name}.set`;
    const send = `${tracker.name}.send`;
    const userCookie = getCookie('GU_U');
    const { ga } = window;

    ga(set, 'forceSSL', true);
    ga(set, 'title', GA.webTitle);
    ga(set, 'anonymizeIp', true);
    /** *************************************************************************************
     * Custom dimensions common to all platforms across the whole Guardian estate          *
     ************************************************************************************** */
    ga(set, 'dimension3', 'theguardian.com'); /* Platform */
    /** *************************************************************************************
     * Custom dimensions for 'editorial' platforms (this site, the mobile apps, etc.)      *
     * Some of these will be undefined for non-content pages, but that's fine.             *
     ************************************************************************************** */
    ga(set, 'dimension4', GA.section);
    ga(set, 'dimension5', GA.contentType);
    ga(set, 'dimension6', GA.commissioningDesks);
    ga(set, 'dimension7', GA.contentId);
    ga(set, 'dimension8', GA.authorIds);
    ga(set, 'dimension9', GA.keywordIds);
    ga(set, 'dimension10', GA.toneIds);
    ga(set, 'dimension11', GA.seriesId);
    ga(set, 'dimension16', (userCookie && 'true') || 'false');
    ga(set, 'dimension21', getQueryParam('INTCMP', window.location.search)); // internal campaign code
    ga(set, 'dimension22', getQueryParam('CMP_BUNIT', window.location.search)); // campaign business unit
    ga(set, 'dimension23', getQueryParam('CMP_TU', window.location.search)); // campaign team
    ga(set, 'dimension26', GA.isHosted);
    ga(set, 'dimension27', navigator.userAgent); // I bet you a pint
    ga(set, 'dimension29', window.location.href); // That both of these are already tracked.
    ga(set, 'dimension30', GA.edition);

    // TODO: sponsor logos
    // ga(set, 'dimension31', GA.sponsorLogos);

    // TODO: commercial branding
    // ga(set, 'dimension42', 'GA.brandingType');

    ga(set, 'dimension43', 'dotcom-rendering');
    ga(set, 'dimension50', GA.pillar);

    if (window.location.hash === '#fbLogin') {
        ga(set, 'referrer', null);
        window.location.hash = '';
    }

    try {
        const NG_STORAGE_KEY = 'gu.analytics.referrerVars';
        const referrerVarsData = window.sessionStorage.getItem(NG_STORAGE_KEY);
        const referrerVars = JSON.parse(referrerVarsData || '""');
        if (referrerVars && referrerVars.value) {
            const d = new Date().getTime();
            if (d - referrerVars.value.time < 60 * 1000) {
                // One minute
                ga(send, 'event', 'Click', 'Internal', referrerVars.value.tag, {
                    nonInteraction: true, // to avoid affecting bounce rate
                    dimension12: referrerVars.value.path,
                });
            }
            window.sessionStorage.removeItem(NG_STORAGE_KEY);
        }
    } catch (e) {
        // do nothing
    }

    ga(send, 'pageview', {
        hitCallback() {
            const image = new Image();
            image.src = `${GA.beaconUrl}/count/pvg.gif`;
        },
    });

    trackLCP(send);
};
