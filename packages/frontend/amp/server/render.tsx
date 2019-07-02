import React from 'react';
import express from 'express';
import { document } from '@frontend/amp/server/document';
import { Article } from '@frontend/amp/pages/Article';
import { extractScripts } from '@frontend/amp/lib/scripts';
import { extract as extractCAPI } from '@frontend/model/extract-capi';
import { extract as extractNAV } from '@frontend/model/extract-nav';
import { AnalyticsModel } from '@frontend/amp/components/Analytics';
import { validateAsCAPIType as validateV2 } from '@frontend/modelV2/validate';

export const render = (
    { body, path }: express.Request,
    res: express.Response,
) => {
    try {
        // TODO remove when migrated to v2
        const CAPI =
            body.version === '2' ? validateV2(body) : extractCAPI(body);

        const linkedData = CAPI.linkedData;

        const config = CAPI.config;
        const blockElements = CAPI.blocks.map(block => block.elements);

        // This is simply to flatten the elements
        const elements = ([] as CAPIElement[]).concat(...blockElements);

        const scripts = [...extractScripts(elements, CAPI.mainMediaElements)];

        const analytics: AnalyticsModel = {
            gaTracker: 'UA-78705427-1',
            title: CAPI.headline,
            fbPixelaccount: '279880532344561',
            comscoreID: '6035250',
            section: CAPI.sectionName || '',
            contentType: CAPI.contentType,
            id: CAPI.pageId,
            beacon: `${CAPI.beaconURL}/count/pv.gif`,
            neilsenAPIID: CAPI.nielsenAPIID,
            domain: 'amp.theguardian.com',
        };

        const metadata = {
            description: CAPI.trailText,
            canonicalURL: CAPI.webURL,
        };

        const resp = document({
            linkedData,
            scripts,
            metadata,
            title: `${CAPI.headline} | ${CAPI.sectionLabel} | The Guardian`,
            body: (
                <Article
                    articleData={CAPI}
                    nav={extractNAV(body)}
                    analytics={analytics}
                    config={config}
                />
            ),
        });

        res.status(200).send(resp);
    } catch (e) {
        res.status(400).send(`<pre>${e.message}</pre>`);
    }
};
