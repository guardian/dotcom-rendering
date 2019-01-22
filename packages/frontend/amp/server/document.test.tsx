import { document } from './document';
import validator from 'amphtml-validator';
import React from 'react';
import { data } from '@root/fixtures/article';
import { Article } from '@frontend/amp/pages/Article';
import { extract as extractNAV } from '@frontend/model/extract-nav';
import { extract as extractConfig } from '@frontend/model/extract-config';
import { extract as extractModel } from '@frontend/model/extract-capi';
import { AnalyticsModel } from '@frontend/amp/components/Analytics';

test('rejects invalid AMP doc (to test validator)', async () => {
    const v = await validator.getInstance();
    const linkedData = {};
    const result = v.validateString(
        document({
            linkedData,
            title: 'foo',
            scripts: [''],
            body: <img alt="foo" />,
        }),
    );
    expect(result.errors.length > 0).toBe(true);
});

test('produces valid AMP doc', async () => {
    const v = await validator.getInstance();
    const config = extractConfig(data);
    const nav = extractNAV(data);
    const model = extractModel(data);
    const linkedData = {};

    const analytics: AnalyticsModel = {
        gaTracker: 'UA-XXXXXXX-X',
        title: 'Foo',
        fbPixelaccount: 'XXXXXXXXXX',
        comscoreID: 'XXXXXXX',
        section: model.sectionName,
        contentType: model.contentType,
        id: model.pageId,
        beacon: `${model.beaconURL}/count/pv.gif`,
        neilsenAPIID: 'XXXXXX-XXXX-XXXX-XXXX-XXXXXXXXX',
        domain: 'amp.theguardian.com',
    };

    const body = (
        <Article
            nav={nav}
            articleData={model}
            config={config}
            analytics={analytics}
        />
    );
    const result = v.validateString(
        document({
            body,
            linkedData,
            title: 'foo',
            scripts: [],
        }),
    );

    if (result.errors.length > 0) {
        // tslint:disable-next-line:no-console
        console.log(result.errors);
    }

    expect(result.errors.length).toBe(0);
});
