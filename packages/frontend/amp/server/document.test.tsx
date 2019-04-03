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
    const linkedData = [{}];
    const metadata = { description: '', canonicalURL: '' };
    const result = v.validateString(
        document({
            linkedData,
            metadata,
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
    const linkedData = [{}];
    const epic = [
        {
            heading: 'As 2019 begins…',
            paragraphs:
                '… we’re asking readers to make a new year contribution in support of The Guardian’s independent journalism. More people are reading and supporting our independent, investigative reporting than ever before. And unlike many news organisations, we have chosen an approach that allows us to keep our journalism open and accessible to all, regardless of where they live or what they can afford. But this is only possible thanks to voluntary support from our readers – something we have to maintain and build on for every year to come.',
            highlightedText:
                'Support The Guardian from as little as %%CURRENCY_SYMBOL%%1 &ndash; and it only takes a minute. Thank you.',
        },
    ];
    const metadata = {
        description: model.trailText,
        canonicalURL: model.webURL,
    };

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
            epic={epic}
        />
    );
    const result = v.validateString(
        document({
            body,
            linkedData,
            metadata,
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
