import validator from 'amphtml-validator';
import React from 'react';
import { CAPI } from '@root/fixtures/CAPI/CAPI';
import { Article } from '@root/src/amp/pages/Article';
import { extract as extractNAV } from '@root/src/model/extract-nav';
import { AnalyticsModel } from '@root/src/amp/components/Analytics';
import {
    getAllActiveExperiments,
    getAllActiveCss,
} from '@root/src/amp/lib/experiment';
import { experimentFullConfig } from '@root/src/amp/experimentConfigs';
import { document } from './document';

test('rejects invalid AMP doc (to test validator)', async () => {
    const v = await validator.getInstance();
    const linkedData = [{}];
    const metadata = { description: '', canonicalURL: '' };
    const abTestCss = '';
    const result = v.validateString(
        document({
            linkedData,
            metadata,
            title: 'foo',
            scripts: [''],
            body: <img alt="foo" />,
            abTestCss,
        }),
    );
    expect(result.errors.length > 0).toBe(true);
});

// TODO failing because fixture still models blocks as nested array of elements
// rather than a list of Block(s) - that are objects with 'id' and 'elements'
// fields. This then errors in Elements.tsx.
test('produces valid AMP doc', async () => {
    const v = await validator.getInstance();
    const { config } = CAPI;
    config.switches['ab-zero-test-experiment'] = true;
    const nav = extractNAV(CAPI.nav);
    const { linkedData } = CAPI;

    const metadata = {
        description: CAPI.trailText,
        canonicalURL: CAPI.webURL,
    };

    const analytics: AnalyticsModel = {
        gaTracker: 'UA-XXXXXXX-X',
        title: 'Foo',
        fbPixelaccount: 'XXXXXXXXXX',
        comscoreID: 'XXXXXXX',
        section: CAPI.sectionName,
        contentType: CAPI.contentType,
        id: CAPI.pageId,
        beacon: `${CAPI.beaconURL}/count/pv.gif`,
        neilsenAPIID: 'XXXXXX-XXXX-XXXX-XXXX-XXXXXXXXX',
        domain: 'amp.theguardian.com',
        permutive: {
            namespace: 'guardian',
            apiKey: '42-2020',
            payload: {
                'properties.content.title': 'article title',
            },
        },
    };

    const activeExperiments = getAllActiveExperiments(
        experimentFullConfig,
        config.switches,
    );
    const abTestCss = getAllActiveCss(experimentFullConfig, config.switches);

    const body = (
        <Article
            nav={nav}
            articleData={CAPI}
            config={config}
            analytics={analytics}
            experiments={activeExperiments}
        />
    );
    const result = v.validateString(
        document({
            body,
            linkedData,
            metadata,
            title: 'foo',
            scripts: [],
            abTestCss,
        }),
    );

    if (result.errors.length > 0) {
        // eslint-disable-next-line no-console
        console.log(result.errors);
    }
    expect(result.errors.length).toBe(0);
});
