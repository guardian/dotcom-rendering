import React from 'react';
import express from 'express';
import { document } from '@root/src/amp/server/document';
import { Article } from '@root/src/amp/pages/Article';
import { extractScripts } from '@root/src/amp/lib/scripts';
import { extract as extractNAV } from '@root/src/model/extract-nav';
import { AnalyticsModel } from '@root/src/amp/components/Analytics';
import { validateAsCAPIType as validateV2 } from '@root/src/model/validate';
import { findBySubsection } from '@root/src/model/article-sections';
import { bodyJSON } from '@root/src/model/exampleBodyJSON';

export const render = (
    { body, path }: express.Request,
    res: express.Response,
) => {
    try {
        // TODO remove when migrated to v2
        const CAPI = validateV2(body);
        const {linkedData} = CAPI;
        const {config} = CAPI;
        const blockElements = CAPI.blocks.map(block => block.elements);

        // This is simply to flatten the elements
        const elements = ([] as CAPIElement[]).concat(...blockElements);

        const scripts = [...extractScripts(elements, CAPI.mainMediaElements)];

        const sectionName = CAPI.sectionName || '';

        const analytics: AnalyticsModel = {
            gaTracker: 'UA-78705427-1',
            title: CAPI.headline,
            fbPixelaccount: '279880532344561',
            comscoreID: '6035250',
            section: sectionName,
            contentType: CAPI.contentType,
            id: CAPI.pageId,
            beacon: `${CAPI.beaconURL}/count/pv.gif`,
            neilsenAPIID: findBySubsection(sectionName).apiID,
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
                    nav={extractNAV(CAPI.nav)}
                    analytics={analytics}
                    config={config}
                />
            ),
        });

        res.status(200).send(resp);
    } catch (e) {
        // a validation error
        if (e instanceof TypeError) {
            res.status(400).send(`<pre>${e.message}</pre>`);
        } else {
            res.status(500).send(`<pre>${e.message}</pre>`);
        }
    }
};

export const renderPerfTest = (req: express.Request, res: express.Response) => {
    req.body = JSON.parse(bodyJSON);
    render(req, res);
};
