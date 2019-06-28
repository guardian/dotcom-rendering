import React from 'react';
import express from 'express';
import { document } from '@frontend/amp/server/document';
import { Article } from '@frontend/amp/pages/Article';
import { extractScripts } from '@frontend/amp/lib/scripts';
import { extract as extractCAPI } from '@frontend/model/extract-capi';
import { extract as extractNAV } from '@frontend/model/extract-nav';
import { extract as extractConfig } from '@frontend/model/extract-config';
import { extract as extractLinkedData } from '@frontend/model/extract-linked-data';
import { AnalyticsModel } from '@frontend/amp/components/Analytics';
import { validateRequestData } from '@frontend/model/validate';

export const render = (
    { body, path }: express.Request,
    res: express.Response,
) => {
    let validatedBody: any;
    try {
        validatedBody = validateRequestData(body, path);
    } catch (e) {
        res.status(400).send(`<pre>${e.stack}</pre>`);
    }

    try {
        const NAV = extractNAV(validatedBody);
        const CAPI = extractCAPI(validatedBody);
        const linkedData = extractLinkedData(validatedBody);
        const config = extractConfig(validatedBody);

        const blockElements = CAPI.blocks.map(block => block.elements);
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
                    nav={NAV}
                    analytics={analytics}
                    config={config}
                />
            ),
        });

        res.status(200).send(resp);
    } catch (e) {
        res.status(500).send(`<pre>${e.stack}</pre>`);
    }
};
