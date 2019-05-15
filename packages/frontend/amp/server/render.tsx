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
import { logger } from '@frontend/app/logging';

import {
    getNavigationData,
    makeGuardianNavigation,
} from '@frontend/app/nav/navigation';

const editionToLocalEdition = (edition: string): EditionLong => {
    switch (edition) {
        case 'UK':
            return 'uk';
        case 'US':
            return 'us';
        case 'AU':
            return 'au';
        case 'INT':
            return 'international';
        default:
            return 'uk';
    }
};

const getStage = (): string =>
    process.env.NODE_ENV === 'production' ? 'PROD' : 'DEV';

let navData: any = getNavigationData(getStage())
    .then(data => (navData = data))
    .catch(() => {
        throw Error('Failed to get navigation data');
    });

export const render = (
    { body, path }: express.Request,
    res: express.Response,
) => {
    try {
        validateRequestData(body, path);
    } catch (err) {
        logger.warn(err);
    }

    try {
        if (!navData) {
            throw Error('Failed to get navigation data before request');
        }

        const navPos = extractNAV(body);
        const CAPI = extractCAPI(body);
        const linkedData = extractLinkedData(body);

        const config = extractConfig(body);
        const blockElements = CAPI.blocks.map(block => block.elements);
        const elements = ([] as CAPIElement[]).concat(...blockElements);

        const scripts = [...extractScripts(elements, CAPI.mainMediaElements)];

        const nav = makeGuardianNavigation(
            navData,
            editionToLocalEdition(CAPI.editionId),
            navPos.currentUrl,
            undefined, // TODO: support custom signposting
            navPos.readerRevenueLinks,
        );

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
                    nav={nav}
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
