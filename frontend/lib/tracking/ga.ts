interface TrackerConfig {
    name: string;
    id: string;
    sampleRate: number;
}
interface Config {
    tracker: TrackerConfig;
    pillar: Pillar;
}

// const getAnalyticsEdition = () => {
//     const edition = (guardian.config.page.edition || '').toLowerCase();
//     return edition === 'int' ? 'international' : edition;
// };

export const init: (_: Config) => void = ({ tracker, pillar }) => {
    const coldQueue = (...args: any[]) => {
        (ga.q = ga.q || []).push(args);
    };

    ga = ga || (coldQueue as UniversalAnalytics.ga);
    ga.l = +new Date();
    ga('create', tracker.id, 'auto', '@tracker.trackerName', {
        sampleRate: 100, // WARNING: we are sampling everyone!
        siteSpeedSampleRate: tracker.sampleRate,
        // TODO: 'userId': identityId
    });
    ga('set', 'forceSSL', true);
    // ga('set', 'title', guardian.config.page.webTitle || '');
    ga('set', 'anonymizeIp', true);
    /***************************************************************************************
     * Custom dimensions common to all platforms across the whole Guardian estate           *
     ***************************************************************************************/
    // ga('set', 'dimension1', guardian.config.ophan.pageViewId);
    // ga('set', 'dimension2', guardian.config.ophan.browserId);
    ga('set', 'dimension3', 'theguardian.com'); /* Platform */
    /***************************************************************************************
     * Custom dimensions for 'editorial' platforms (this site, the mobile apps, etc.)       *
     * Some of these will be undefined for non-content pages, but that's fine.              *
     ****************************************************************************************/

    // ga('set', 'dimension4', guardian.config.page.section);
    // ga(
    //     'set',
    //     'dimension5',
    //     convertContentType(guardian.config.page.contentType),
    // );
    // ga('set', 'dimension6', guardian.config.page.commissioningDesks);
    // ga('set', 'dimension7', guardian.config.page.contentId);
    // ga('set', 'dimension8', guardian.config.page.authorIds);
    // ga('set', 'dimension9', guardian.config.page.keywordIds);
    // ga('set', 'dimension10', guardian.config.page.toneIds);
    // ga('set', 'dimension11', guardian.config.page.seriesId);
    // ga('set', 'dimension15', identityId);
    // ga('set', 'dimension16', isLoggedIn);
    // ga('set', 'dimension21', getQueryParam('INTCMP')); @* internal campaign code *@
    // ga('set', 'dimension22', getQueryParam('CMP_BUNIT')); @* campaign business unit*@
    // ga('set', 'dimension23', getQueryParam('CMP_TU')); @* campaign team*@
    // ga('set', 'dimension26', (!!guardian.config.page.isHosted).toString());
    ga('set', 'dimension27', navigator.userAgent); // I bet you a pint
    ga('set', 'dimension29', window.location.href); // That both of these are already tracked.
    // ga('set', 'dimension30', getAnalyticsEdition());
    // @for(sponsorLogos <- listSponsorLogosOnPage(page)) {
    //   ga('set', 'dimension31', '@Html(sponsorLogos.mkString("|"))');
    // }
    // @for(brandingType <- Commercial.brandingType(page)) {
    //   ga('set', 'dimension42', '@brandingType.name');
    // }
    ga('set', 'dimension43', 'guui');
    ga('set', 'dimension50', pillar);

    // if(document.location.hash === '#fbLogin') {
    //     ga('set', 'referrer', null);
    //     document.location.hash = '';
    // }
};

export default ga;
